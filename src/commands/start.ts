import { Context } from 'grammy';

import { prisma } from '@/utils/prisma-client';

const start = async (ctx: Context) => {
  const { id, first_name, last_name, username } = ctx.from ?? {};

  const name = first_name ?? last_name ?? username ?? 'Пользователь';

  await prisma.user.upsert({
    where: { id },
    update: {
      username,
      surname: last_name,
      name: first_name,
    },
    create: {
      id: id!,
      username,
      surname: last_name,
      name: first_name,
    },
  });

  await ctx.reply(
    `Привет, *${name}* 🤗\nДанный бот предназначен помочь вам с расписанием в школе СШ\\-27`,
    { parse_mode: 'MarkdownV2' }
  );
};

export default start;
