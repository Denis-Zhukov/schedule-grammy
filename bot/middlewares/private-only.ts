import { MiddlewareFn } from 'grammy';

export const privateOnlyMiddleware: MiddlewareFn = async (ctx, next) => {
  if (!ctx.chat || ctx.chat.type !== 'private') {
    try {
      await ctx.reply('This command is only available in private chats');
    } catch {}
    return;
  }

  await next();
};
