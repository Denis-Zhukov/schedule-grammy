import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';

import { Config } from './types';

const env = dotenv.config();
if (env.error || !env.parsed) throw env.error;
export const config = dotenvParseVariables(env.parsed) as Config;
