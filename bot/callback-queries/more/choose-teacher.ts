import { chooseTeacher } from '@bot/general-requests/choose-teacher';
import { CustomContext } from '@bot/types';

export const chooseTeacherQueryCallback = async (ctx: CustomContext) => {
  await chooseTeacher(ctx);
  await ctx.answerCallbackQuery();
};

export default ['choose-teacher', chooseTeacherQueryCallback];
