import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';

import { Config } from './types';

if (process.env.NODE_ENV !== 'production') {
  const env = dotenv.config();
  if (!env.error && env.parsed) {
    const parsed = dotenvParseVariables(env.parsed);
    Object.assign(process.env, parsed);
  } else if (env.error) {
    console.warn('.env file is not loaded:', env.error.message);
  }
}

export const config: Config = {
  API_TOKEN: process.env.API_TOKEN || '',
  ADMIN_ID: Number(process.env.ADMIN_ID) || 0,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || '',
  USERNAME_BOT: process.env.USERNAME_BOT || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  SERVER_URL: process.env.SERVER_URL || '',
};

const requiredFields = ['API_TOKEN', 'DATABASE_URL', 'SERVER_URL'];
requiredFields.forEach((field) => {
  if (!config[field as keyof Config]) {
    throw new Error(`Missing required environment variable: ${field}`);
  }
});
