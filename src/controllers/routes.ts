import { Router } from 'express';
import { PageViewEvent, ViewContentEvent, ClickEvent, ConversionEvent } from './events';

const routes = Router();
300
routes.post('/track/pageview', PageViewEvent);
routes.post('/track/viewcontent', ViewContentEvent);
routes.post('/track/click', ClickEvent);
routes.post('/track/conversion', ConversionEvent);

export { routes };