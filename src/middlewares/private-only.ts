import { MiddlewareFn } from 'grammy';

const privateOnlyMiddleware: MiddlewareFn = async (ctx, next) => {
  if (!ctx.chat || ctx.chat.type !== 'private') {
    await ctx.reply('This command is only available in private chats');
    return;
  }

  await next();
};

export default privateOnlyMiddleware;
