import { languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';
import { generateKeyboardMenu } from '@bot/utils/set-keyboard-menu';

const b = async (ctx: CustomContext) => {
  await ctx.setChatMenuButton({
    menu_button: { type: 'commands' },
  });

  const lang = ctx.config.lang;

  const keyboardMenu = generateKeyboardMenu(lang);

  await ctx.reply(languages[lang].menuSet, { reply_markup: keyboardMenu });
};

export default b;
