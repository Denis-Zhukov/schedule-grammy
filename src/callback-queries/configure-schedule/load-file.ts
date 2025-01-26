import { CustomContext } from '@/types';

export const loadFile = async (ctx: CustomContext) => {
  ctx.session.waitingForFile = true;

  await ctx.reply('Загрузите json файл');
  await ctx.answerCallbackQuery('Загрузите json файл');
};

export default ['load-file', loadFile];
