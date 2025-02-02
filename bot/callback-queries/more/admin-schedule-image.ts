import { adminScheduleImage } from '@bot/general-requests/admin-schedule-image';
import { CustomContext } from '@bot/types';

export const adminScheduleImageQueryCallback = async (ctx: CustomContext) => {
  await adminScheduleImage(ctx);
  await ctx.answerCallbackQuery();
};

export default ['admin-schedule', adminScheduleImageQueryCallback];
