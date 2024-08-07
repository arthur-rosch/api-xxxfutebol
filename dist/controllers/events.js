"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionEvent = exports.ClickEvent = exports.ViewContentEvent = exports.PageViewEvent = void 0;
const bizSdk = require('facebook-nodejs-business-sdk');
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;
const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const access_token = 'EAAbtAj6OkvABO2ZCCl2b4XKi7H8LJYV3YZBTtCfwHZAvrSuZAukZBlJspboPR7K0OX4aeCO1Nq1qQZAsJSsrdLQ7ILwUmiop9MNZBJaDIYoXgya3D5iwva1ii0o9ZAegF97ouzVUx3oZBxxffX8OFpKKBuRPK4aRrO2GKS0g4I5g05w3rbT8O8L2ekksGZAXWl6GdgjQZDZD';
const pixel_id = '442646125238603';
const api = bizSdk.FacebookAdsApi.init(access_token);
const sendPageViewEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const current_timestamp = Math.floor(new Date().getTime() / 1000);
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const fbp = req.body.fbp;
    const fbc = req.body.fbc;
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
        .setFbp(fbp)
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
        const response = yield eventRequest.execute();
        res.status(200).json({ success: true, response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
    }
});
const sendViewContentEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const current_timestamp = Math.floor(new Date().getTime() / 1000);
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const fbp = req.body.fbp;
    const fbc = req.body.fbc;
    const content = (new Content())
        .setId('apostasprivilegiadas')
        .setQuantity(1);
    const customData = (new CustomData())
        .setContents([content])
        .setCurrency("BRL");
    const userData = new UserData()
        .setClientIpAddress(userIp)
        .setClientUserAgent(userAgent)
        .setFbp(fbp)
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
        const response = yield eventRequest.execute();
        res.status(200).json({ success: true, response });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
const sendClickEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const current_timestamp = Math.floor(new Date().getTime() / 1000);
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const fbp = req.body.fbp;
    const fbc = req.body.fbc;
    const userData = new UserData()
        .setClientIpAddress(userIp)
        .setClientUserAgent(userAgent)
        .setFbp(fbp)
        .setFbc(fbc);
    const serverEvent = new ServerEvent()
        .setEventName('Click') // Use 'TrackClick' or another relevant event name if needed
        .setEventTime(current_timestamp)
        .setUserData(userData)
        .setEventSourceUrl(req.body.url)
        .setActionSource('website');
    const eventsData = [serverEvent];
    const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);
    try {
        const response = yield eventRequest.execute();
        res.status(200).json({ success: true, response });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
const sendConversionEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const current_timestamp = Math.floor(new Date().getTime() / 1000);
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const fbp = req.body.fbp;
    const fbc = req.body.fbc;
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
        .setFbp(fbp)
        .setFbc(fbc);
    const serverEvent = new ServerEvent()
        .setEventName('Contact')
        .setEventTime(current_timestamp)
        .setUserData(userData)
        .setEventSourceUrl(req.body.url)
        .setActionSource('website')
        .setCustomData(customData);
    const eventsData = [serverEvent];
    const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);
    try {
        const response = yield eventRequest.execute();
        res.status(200).json({ success: true, response, "teste": "Contact" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
    }
});
const PageViewEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sendPageViewEvent(req, res);
});
exports.PageViewEvent = PageViewEvent;
const ViewContentEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sendViewContentEvent(req, res);
});
exports.ViewContentEvent = ViewContentEvent;
const ClickEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sendClickEvent(req, res);
});
exports.ClickEvent = ClickEvent;
const ConversionEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sendConversionEvent(req, res);
});
exports.ConversionEvent = ConversionEvent;
