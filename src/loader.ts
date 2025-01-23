import { readdir } from 'fs/promises';
import { Bot } from 'grammy';
import * as path from 'path';

export async function loadCommands(bot: Bot) {
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
