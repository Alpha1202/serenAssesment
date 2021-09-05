/* eslint-disable require-jsdoc */
/* eslint-disable import/prefer-default-export */
import Redis from 'ioredis';
import config from './config';

const { redisUrl } = config;

const redis = new Redis(redisUrl);

export class State {
  static async getStep(key) {
    const result = await redis.get(key);
    return result;
  }

  static setStep(value) {
    redis.set('step', value);
  }
}
