import { Request, Response } from 'express';
const bizSdk = require('facebook-nodejs-business-sdk');
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;
const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;

const access_token = 'EAAbtAj6OkvABO2ZCCl2b4XKi7H8LJYV3YZBTtCfwHZAvrSuZAukZBlJspboPR7K0OX4aeCO1Nq1qQZAsJSsrdLQ7ILwUmiop9MNZBJaDIYoXgya3D5iwva1ii0o9ZAegF97ouzVUx3oZBxxffX8OFpKKBuRPK4aRrO2GKS0g4I5g05w3rbT8O8L2ekksGZAXWl6GdgjQZDZD';
const pixel_id = '442646125238603';
const api = bizSdk.FacebookAdsApi.init(access_token);

// Função para formatar o fbc
const formatClickID = (fbclid: string, domain: string) => {
  const subdomainIndex = {
    "com": 0,
    "apostasprivilegiadas.com.br": 1,
    "www.apostasprivilegiadas.com.br": 2
  }[domain] || 1;

  const creationTime = Math.floor(new Date().getTime() / 1000);

  return `fb.${subdomainIndex}.${creationTime}.${fbclid}`;
};

// Função para extrair fbc da URL
const extractFbcFromUrl = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const fbclid = urlParams.get('fbclid');
  
  if (fbclid) {
    const domain = new URL(url).hostname;
    return formatClickID(fbclid, domain);
  }
  return null;
};

const sendPageViewEvent = async (req: Request, res: Response) => {
  const current_timestamp = Math.floor(new Date().getTime() / 1000);
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const fbp = req.body.fbp;
  const fbc = extractFbcFromUrl(req.body.url);
  console.log(fbc);
  console.log(fbc, fbp, userIp, userAgent);

  const content = (new Content())
    .setId('apostasprivilegiadas')
    .setQuantity(1);

  const customData = (new CustomData())
    .setContents([content])
    .setCurrency("BRL");

  const userData = new UserData()
    .setClientIpAddress(userIp)
    .setClientUserAgent(userAgent)
    .setFbc(fbc);

  const serverEvent = new ServerEvent()
    .setEventName('PageView')
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setEventSourceUrl(req.body.url)
    .setActionSource('website')
    .setCustomData(customData);

  const eventsData = [serverEvent];
  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);

  try {
    const response = await eventRequest.execute();
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

const sendViewContentEvent = async (req: Request, res: Response) => {
  const current_timestamp = Math.floor(new Date().getTime() / 1000);
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const fbp = req.body.fbp;
  const fbc = extractFbcFromUrl(req.body.url);

  const content = (new Content())
    .setId('apostasprivilegiadas')
    .setQuantity(1);

  const customData = (new CustomData())
    .setContents([content])
    .setCurrency("BRL");

  const userData = new UserData()
    .setClientIpAddress(userIp)
    .setClientUserAgent(userAgent)
    .setFbc(fbc);

  const serverEvent = new ServerEvent()
    .setEventName('ViewContent')
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setEventSourceUrl(req.body.url)
    .setActionSource('website')
    .setCustomData(customData);

  const eventsData = [serverEvent];
  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);

  try {
    const response = await eventRequest.execute();
    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const sendClickEvent = async (req: Request, res: Response) => {
  const current_timestamp = Math.floor(new Date().getTime() / 1000);
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const fbp = req.body.fbp;
  const fbc = extractFbcFromUrl(req.body.url);

  const userData = new UserData()
    .setClientIpAddress(userIp)
    .setClientUserAgent(userAgent)
    .setFbc(fbc);

  const serverEvent = new ServerEvent()
    .setEventName('Click')  // Use 'TrackClick' or another relevant event name if needed
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setEventSourceUrl(req.body.url)
    .setActionSource('website');

  const eventsData = [serverEvent];
  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);

  try {
    const response = await eventRequest.execute();
    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const sendConversionEvent = async (req: Request, res: Response) => {
  const current_timestamp = Math.floor(new Date().getTime() / 1000);
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const fbc = extractFbcFromUrl(req.body.url);
  console.log(fbc)

  const content = (new Content())
    .setId('apostasprivilegiadas')
    .setQuantity(1);

  const customData = (new CustomData())
    .setContents([content])
    .setCurrency("BRL")
    .setValue("1");

  const userData = new UserData()
    .setClientIpAddress(userIp)
    .setClientUserAgent(userAgent)
    .setFbc(fbc);

  const serverEvent = new ServerEvent()
    .setEventName('Purchase')
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setEventSourceUrl(req.body.url)
    .setActionSource('website')
    .setCustomData(customData);

  const eventsData = [serverEvent];
  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);

  try {
    const response = await eventRequest.execute();
    res.status(200).json({ success: true, response, "teste": "Contact" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

export const PageViewEvent = async (req: Request, res: Response) => {
  await sendPageViewEvent(req, res);
};

export const ViewContentEvent = async (req: Request, res: Response) => {
  await sendViewContentEvent(req, res);
};

export const ClickEvent = async (req: Request, res: Response) => {
  await sendClickEvent(req, res);
};

export const ConversionEvent = async (req: Request, res: Response) => {
  await sendConversionEvent(req, res);
};
