import { config } from 'dotenv';

config();

const envConfig = {
  devDatabase: process.env.DATABASE_URI,
  database: process.env.DATABASE_URI,
  isDev: process.env.NODE_ENV === 'development',
  port: process.env.PORT,
  slackSecret: process.env.SLACK_SIGNING_SECRET,
  botToken: process.env.SLACK_BOT_TOKEN,
  redisUrl: process.env.REDISCLOUD_URL
};

export default envConfig;
