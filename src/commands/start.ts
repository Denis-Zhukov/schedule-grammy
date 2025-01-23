import { Context } from 'grammy';

const start = async (ctx: Context) => {
  const { first_name, last_name, username } = ctx.from ?? {};

  const name = first_name ?? last_name ?? username ?? 'Пользователь';

  await ctx.reply(
    `Привет, *${name}* 🤗\nДанный бот предназначен помочь вам с расписанием в школе СШ\\-27`,
    { parse_mode: 'MarkdownV2' }
  );
};

export default start;
