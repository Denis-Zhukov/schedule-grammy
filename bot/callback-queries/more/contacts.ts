import { contacts } from '@bot/general-requests/contacts';
import { CustomContext } from '@bot/types';

export const contactsQueryCallback = async (ctx: CustomContext) => {
  await contacts(ctx);
  await ctx.answerCallbackQuery();
};

export default ['contacts', contactsQueryCallback];
