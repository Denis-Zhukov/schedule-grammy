import { Teacher } from '@prisma/client';
import { Bot, Context, SessionFlavor } from 'grammy';

import { LanguageCode } from '@/constants/languages';

export type Config = {
  API_TOKEN: string;
  ADMIN_ID: number;
  DATABASE_URL: string;
  ADMIN_USERNAME: string;
};

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

export type weekOfDay = {
  className: number;
  subclass: string;
  timeStart: Date;
  timeEnd: Date;
  classroom: string;
  teacher: Teacher;
  canteen: boolean;
  lead: boolean;
};
