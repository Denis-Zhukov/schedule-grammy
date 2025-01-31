import { languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';
import { prisma } from '@bot/utils/prisma-client';
import { generateKeyboardMenu } from '@bot/utils/set-keyboard-menu';

const start = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  const { id, first_name, last_name, username } = ctx.from ?? {};
  const name = first_name ?? last_name ?? username ?? languages[lang].user;

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

  await ctx.reply(languages[lang].greetings(name), {
    parse_mode: 'MarkdownV2',
    reply_markup: generateKeyboardMenu(lang),
  });
};

export default ['start', start];
