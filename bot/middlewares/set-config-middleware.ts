import { NextFunction } from 'grammy';

import { envConfig } from '@/env-config';
import { languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';

export const setConfigMiddleware = async (
  ctx: CustomContext,
  next: NextFunction,
) => {
  const lang = (ctx.from?.language_code as keyof typeof languages) || 'en';

  ctx.config = {
    isAdmin: ctx.from?.id === envConfig.ADMIN_ID,
    lang: lang in languages ? lang : 'en',
  };

  await next();
};
