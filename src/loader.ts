import * as fs from 'fs/promises';
import { Middleware } from 'grammy';
import * as path from 'path';

import { CustomBot, CustomContext } from '@/types';

type FileHandler = (
  bot: CustomBot,
  pattern: string | string[],
  handler: Middleware<CustomContext>,
) => void;

async function loadFilesFromDirectory(
  bot: CustomBot,
  directoryPath: string,
  handler: FileHandler,
  transform?: (
    module: unknown,
    fileName: string,
  ) => [string | string[], Middleware<CustomContext>],
) {
  const dirents = await fs.readdir(directoryPath, {
    withFileTypes: true,
    recursive: true,
  });

  for (const dirent of dirents) {
    if (dirent.isFile()) {
      const module = await import(path.resolve(dirent.parentPath, dirent.name));
      const fileName = dirent.name.replace(/\.ts$/, '');

      if (module.default) {
        const [pattern, transformedHandler] = transform
          ? transform(module.default, fileName)
          : [fileName, module.default];

        handler(bot, pattern, transformedHandler);
      } else {
        throw new Error(`${fileName} is not exported by default`);
      }
    }
  }
}

export async function loadCommands(bot: CustomBot) {
  await loadFilesFromDirectory(
    bot,
    path.resolve(__dirname, 'commands'),
    (bot, commandName, command) => {
      bot.command((<string>commandName).replaceAll('-', '_'), command);
    },
  );
}

export async function loadHears(bot: CustomBot) {
  await loadFilesFromDirectory(
    bot,
    path.resolve(__dirname, 'hears'),
    (bot, pattern, handler) => {
      bot.hears(pattern, handler);
    },
    (module) => module as [string, Middleware<CustomContext>],
  );
}

export async function loadCallbackQueries(bot: CustomBot) {
  await loadFilesFromDirectory(
    bot,
    path.resolve(__dirname, 'callback-queries'),
    (bot, queryName, callbackQuery) => {
      bot.callbackQuery(queryName, callbackQuery);
    },
  );
}
