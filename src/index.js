/* eslint-disable no-console */
import 'regenerator-runtime/runtime';
import express from 'express';

import config from './helpers/config';
import middlewareConfig from './helpers/middleware';
import { BotRoutes } from './modules';

const { port } = config;

const app = express();

middlewareConfig(app);

const routes = [BotRoutes];

routes.map((route) => app.use('/slack', route));

app.all('*', (req, res) => res.status(404).send({
  status: 'error',
  message: '404 not found',
}));

app
  .listen(port, () => console.log(`Welcome, slack app is running on ${port}`))
  .on('error', (err) => {
    if (err.syscall !== 'listen') {
      throw err;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (err.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw err;
    }
  });
