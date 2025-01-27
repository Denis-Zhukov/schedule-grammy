import { languages } from '@bot/constants/languages';
import { CustomBot } from '@bot/types';

export const setMyCommands = async (bot: CustomBot) => {
  const commandKeys = [
    'b',
    'reset',
    'adminSchedule',
    'callSchedule',
    'contacts',
  ] as const;

  for (const [lang, { myCommands }] of Object.entries(languages)) {
    const commands = commandKeys.map((key) => ({
      command: key.replace(/([A-Z])/g, '_$1').toLowerCase(),
      description: myCommands[key as keyof typeof myCommands],
    }));

    await bot.api.setMyCommands(commands, {
      language_code: lang as keyof typeof languages,
    });
  }
};
