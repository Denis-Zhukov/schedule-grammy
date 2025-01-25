import { Bot, Context, SessionFlavor } from 'grammy';

import { LanguageCode } from '@/constants/languages';

export type SessionData = {
  waitingForFile?: boolean;
  selectedDay?: string;
};

export type CustomContext = {
  config: {
    isAdmin: boolean;
    lang: LanguageCode;
  };
} & Context &
  SessionFlavor<SessionData>;

export type CustomBot = Bot<CustomContext>;
