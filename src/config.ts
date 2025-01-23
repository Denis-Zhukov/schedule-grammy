import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';

export type Config = {
  API_TOKEN: string;
  ADMIN_ID: number;
  DATABASE_URL: string;
};

const env = dotenv.config({});
if (env.error || !env.parsed) throw env.error;
export const config = dotenvParseVariables(env.parsed) as Config;
