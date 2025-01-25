import { CustomContext } from '../types';
import { generateKeyboardMenu } from '../utils/set-keyboard-menu';
import { languages } from '@/constants/languages';

const resetMenu = async (ctx: CustomContext) => {
  await ctx.setChatMenuButton({
    menu_button: { type: 'commands' },
  });

  const lang = ctx.config.lang;

  const keyboardMenu = generateKeyboardMenu(lang);

  await ctx.reply(languages[lang].menuSet, { reply_markup: keyboardMenu });
};

export default resetMenu;
