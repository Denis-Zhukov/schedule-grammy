import { Context } from 'grammy';

import { keyboard } from '../constants/keyboard-menu';

const resetMenu = async (ctx: Context) => {
  await ctx.setChatMenuButton({
    menu_button: { type: 'commands' },
  });

  await ctx.reply('Кнопки установлены', { reply_markup: keyboard });
};

export default resetMenu;
