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
    imTeacher: "I'm a teacher",
    adminSchedule: 'Duty administrator',
    callSchedule: 'Call schedule',
    reset: 'Reset settings',
    contacts: 'Contacts',
  },
  answerToImTeacher: (username: string) =>
    `To confirm that you are a teacher, contact ${username}`,
  contacts: (username: string) => `Developer: ${username}`,
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
    imTeacher: 'Я учитель',
    adminSchedule: 'Дежурный администратор',
    callSchedule: 'Расписание звонков',
    reset: 'Сбросить настройки',
    contacts: 'Контакты',
  },
  answerToImTeacher: (username: string) =>
    `Для подтверждения того, что вы учитель свяжитесь с ${username}`,
  contacts: (username: string) => `Разработчик: ${username}`,
  error: 'Упс, что-то пошло не так 😬',
} as const;

export const languages = {
  en,
  ru,
};

export type LanguageCode = keyof typeof languages;
