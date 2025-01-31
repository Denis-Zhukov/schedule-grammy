import {
  CallbackQueryMiddleware,
  CommandMiddleware,
  HearsMiddleware,
} from 'grammy';

import { CustomBot, CustomContext } from '@bot/types';

export async function loadCommands(bot: CustomBot) {
  const commands = [
    await import('@bot/commands/start'),
    await import('@bot/commands/my-commands/contacts'),
    await import('@bot/commands/my-commands/set-buttons'),
    await import('@bot/commands/my-commands/admin-schedule'),
    await import('@bot/commands/my-commands/call-schedule'),
    await import('@bot/commands/logs'),
    await import('@bot/commands/set-teacher'),
    await import('@bot/commands/remove-teacher'),
  ];

  commands.forEach((command) => {
    const [commandName, commandCallback] = command.default;
    bot.command(
      commandName as string,
      commandCallback as CommandMiddleware<CustomContext>,
    );
  });
}

export async function loadHears(bot: CustomBot) {
  const hears = [
    await import('@bot/hears/more'),
    await import('@bot/hears/weekday-schedule'),
    await import('@bot/hears/today-schedule'),
  ];

  hears.forEach((command) => {
    const [routes, hear] = command.default;
    bot.hears(routes as string[], hear as HearsMiddleware<CustomContext>);
  });
}

export async function loadCallbackQueries(bot: CustomBot) {
  const callbackQueries = [
    await import('@bot/callback-queries/set-following-teacher'),
    await import('@bot/callback-queries/more/more'),
    await import('@bot/callback-queries/more/contacts'),
    await import('@bot/callback-queries/more/call-schedule'),
    await import('@bot/callback-queries/more/admin-schedule'),
    await import('@bot/callback-queries/more/im-teacher'),
    await import('@bot/callback-queries/more/reset-settings'),
    await import('@bot/callback-queries/configure-schedule'),
  ];

  callbackQueries.forEach((command) => {
    const [routes, callbackQuery] = command.default;
    bot.callbackQuery(
      routes as string,
      callbackQuery as CallbackQueryMiddleware<CustomContext>,
    );
  });
}
