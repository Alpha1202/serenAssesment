/* eslint-disable quote-props */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from 'axios';

const baseUrl = 'https://slack.com/api/chat.postEphemeral';

const dotenv = require('dotenv');

dotenv.config();

const BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

export const API = async (data) => {
  const headers = { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${BOT_TOKEN}` };
  const response = await axios({
    method: 'POST', url: baseUrl, data, headers
  });

  return response;
};
