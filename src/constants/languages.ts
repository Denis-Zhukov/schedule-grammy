export const en = {
  myCommands: {
    b: 'Buttons disappeared',
    reset: 'Reset settings',
    adminSchedule: 'Duty administrator',
    callSchedule: 'Call schedule',
    contacts: 'Contacts',
  },
  keyboardMenuItems: [
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ['Today', 'Now', 'Tomorrow', 'More'],
  ],
  user: 'User',
  greetings: (name: string) =>
    `Hello, *${name}* 🤗\nThis bot is designed to help you with the schedule at school SSH\\-27`,
  menuSet: 'Buttons are set',
  moreInlineKeyboard: {
    adminSchedule: 'Duty administrator',
    callSchedule: 'Call schedule',
    reset: 'Reset settings',
    contacts: 'Contacts',
  },
  error: 'Oops, something went wrong 😬',
};

export const ru: typeof en = {
  myCommands: {
    b: 'Пропали кнопки',
    reset: 'Сбросить настройки',
    adminSchedule: 'Дежурный администратор',
    callSchedule: 'Расписание звонков',
    contacts: 'Контакты',
  },
  user: 'Пользователь',
  greetings: (name: string) =>
    `Привет, *${name}* 🤗\nДанный бот предназначен помочь вам с расписанием в школе СШ\\-27`,
  keyboardMenuItems: [
    ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    ['Сегодня', 'Сейчас', 'Завтра', 'Ещё'],
  ],
  menuSet: 'Кнопки установлены',
  moreInlineKeyboard: {
    adminSchedule: 'Дежурный администратор',
    callSchedule: 'Расписание звонков',
    reset: 'Сбросить настройки',
    contacts: 'Контакты',
  },
  error: 'Упс, что-то пошло не так 😬',
};

export const languages = {
  en,
  ru,
} as const;

export type LanguageCode = keyof typeof languages;
