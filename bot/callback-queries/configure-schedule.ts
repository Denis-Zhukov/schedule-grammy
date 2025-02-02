import { envConfig } from '@/env-config';
import { languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';
import jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

const configureSchedule = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  const payload: JWT = {
    id: ctx.from!.id,
    surname: ctx.from?.last_name,
    name: ctx.from?.first_name,
  };

  const token = jwt.sign(payload, envConfig.AUTH_SECRET, { expiresIn: '10m' });
  const url = `${envConfig.SERVER_URL}/auth/sign-in?token=${token}`;

  await ctx.editMessageReplyMarkup({
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: languages[lang].openControlPanel,
            url,
          },
        ],
      ],
    },
  });
};

export default ['configure-schedule', configureSchedule];
