import axios from 'axios';
import { ZodError } from 'zod';

import { config } from '@/config';
import { CustomBot } from '@/types';
import { parseDaySchedule } from '@/utils/validations/parse-day-schedule';

export const registerGetDocument = (bot: CustomBot) => {
  bot.on(['message:document'], async (ctx) => {
    try {
      const path = (await ctx.getFile()).file_path;

      const res = await axios.get(
        `https://api.telegram.org/file/bot${config.API_TOKEN}/${path}`,
      );

      parseDaySchedule(res.data);

      await ctx.reply('Файл успешно обработан');
    } catch (err) {
      if (err instanceof ZodError) {
        await ctx.reply(err.message);
      }
      console.log(err);
    }
  });
};
