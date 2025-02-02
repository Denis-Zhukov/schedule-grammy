import { callScheduleImage } from '@bot/general-requests/call-schedule-image';
import { CustomContext } from '@bot/types';

export const callScheduleImageQueryCallback = async (ctx: CustomContext) => {
  await callScheduleImage(ctx);
  await ctx.answerCallbackQuery();
};

export default ['call-schedule', callScheduleImageQueryCallback];
