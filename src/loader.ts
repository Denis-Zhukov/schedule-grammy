import { readdir } from 'fs/promises';
import * as path from 'path';

import { CustomBot } from '@/types';

export async function loadCommands(bot: CustomBot) {
  const commandsPath = path.resolve(__dirname, 'commands');
  const files = await readdir(commandsPath);

  for (const file of files) {
    if (file.endsWith('.ts')) {
      const command = await import(path.join(commandsPath, file));
      const commandName = file.replace(/\.ts$/, '');

      if (command.default) {
        bot.command(commandName, command.default);
      } else {
        throw new Error(`Command /${commandName} is not exported by default`);
      }
    }
  }
}

export async function loadHears(bot: CustomBot) {
  const hearsPath = path.resolve(__dirname, 'hears');
  const files = await readdir(hearsPath);

  for (const file of files) {
    if (file.endsWith('.ts')) {
      const hear = await import(path.join(hearsPath, file));

      if (hear.default) {
        const [pattern, handler] = hear.default;
        bot.hears(pattern, handler);
      } else {
        throw new Error(`Hears handler ${file} is not exported by default`);
      }
    }
  }
}
