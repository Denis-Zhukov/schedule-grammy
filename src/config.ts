import dotenv from 'dotenv';

dotenv.config();

export const config = {
  API_TOKEN: process.env.API_TOKEN ?? '',
  ADMIN_ID: process.env.ADMIN_ID ?? '',
} as const;
