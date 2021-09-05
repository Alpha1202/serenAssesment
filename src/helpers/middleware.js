/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';

const {
  isDev, devDatabase, database, slackSecret, botToken
} = config;

mongoose.connect(isDev ? devDatabase : database, { useNewUrlParser: true }).then(() => {
  console.log('db now connected');
}).catch((err) => {
  process.exit();
});

export default (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(resolve(__dirname, 'src/public')));
  app.use(cors());
};
