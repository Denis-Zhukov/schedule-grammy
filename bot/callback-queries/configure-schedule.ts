import { config } from '@/config';
import { languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';

const configureSchedule = async (ctx: CustomContext) => {
  const url = config.SERVER_URL;
  const lang = ctx.config.lang;

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
