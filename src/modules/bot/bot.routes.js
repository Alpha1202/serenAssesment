import { Router } from 'express';

import botMessage from './bot.controller';
import { handleSteps } from './bot.middleware';

const routes = Router();

routes.post('/events', handleSteps, botMessage);

export default routes;
