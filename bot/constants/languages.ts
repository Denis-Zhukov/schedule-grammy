import { format, toZonedTime } from 'date-fns-tz';

import { classes } from '@bot/constants/classes';
import { timezone } from '@bot/constants/time';
import { weekOfDay } from '@bot/types';

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
    schedule: 'Configure schedule',
  },
  answerToImTeacher: (username: string) =>
    `To confirm that you are a teacher, contact ${username}`,
  contacts: (username: string) => `Developer: ${username}`,
  isTeacherNow: (surname: string | null, name: string | null) =>
    `${surname} ${name} is now a teacher`,
  isNotTeacherNow: (surname: string | null, name: string | null) =>
    `${surname} ${name} is no longer a teacher`,
  isNotTeacher: (userId: string) => `${userId} is not a teacher`,
  notFound: 'User is not found',
  success: 'Success',
  gap: '🙌 *Gap*',
  lesson: ({
    lesson,
    classroom,
    timeEnd,
    timeStart,
    subclass,
    className,
    teacher: { surname, name, patronymic },
    canteen,
    lead,
  }: weekOfDay) => {
    const classroomName = classroom?.replace('-', '\\-') ?? '';
    const teacher = `${surname} ${name[0]}.${patronymic?.[0]}.`;

    const start = format(toZonedTime(timeStart, timezone), 'HH:mm', {
      timeZone: timezone,
    });
    const end = format(toZonedTime(timeEnd, timezone), 'HH:mm', {
      timeZone: timezone,
    });

    return `${classes[className] ?? className}*${subclass}* ${lesson} ${classroomName} \`${teacher}\` _ __${start}\\-${end}__ _${
      canteen ? '\n\t\t\t\t\t\t*Отвести в столовку* 🍽' : ''
    }${lead ? '\n\t\t\t\t\t\t*Вывести из школы* 🏃‍➡️' : ''}`;
  },
  back: 'Back',
  openControlPanel: 'Open control panel',
  holiday: "Today's classes are CANCELLED! 🥳",
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
    schedule: 'Управление расписанием',
  },
  answerToImTeacher: (username: string) =>
    `Для подтверждения того, что вы учитель свяжитесь с ${username}`,
  contacts: (username: string) => `Разработчик: ${username}`,
  isTeacherNow: (surname: string | null, name: string | null) =>
    `${surname} ${name} теперь учитель`,
  isNotTeacherNow: (surname: string | null, name: string | null) =>
    `${surname} ${name} теперь не учитель`,
  isNotTeacher: (userId: string) => `${userId} не является учитель`,
  notFound: 'Пользователь не найден',
  success: 'Успешно',
  gap: '🙌 *Форточка*',
  lesson: ({
    lesson,
    classroom,
    timeEnd,
    timeStart,
    subclass,
    className,
    teacher: { surname, name, patronymic },
    canteen,
    lead,
  }: weekOfDay) => {
    const classroomName = classroom?.replace('-', '\\-') ?? '';
    const teacher = `${surname} ${name[0]}.${patronymic?.[0]}.`;

    const start = format(toZonedTime(timeStart, timezone), 'HH:mm', {
      timeZone: timezone,
    });
    const end = format(toZonedTime(timeEnd, timezone), 'HH:mm', {
      timeZone: timezone,
    });

    return `${classes[className] ?? className}*${subclass}* ${lesson} ${classroomName} \`${teacher}\` _ __${start}\\-${end}__ _${
      canteen ? '\n\t\t\t\t\t\t*Отвести в столовку* 🍽' : ''
    }${lead ? '\n\t\t\t\t\t\t*Вывести из школы* 🏃‍➡️' : ''}`;
  },
  back: 'Назад',
  openControlPanel: 'Открыть панель управления',
  holiday: 'Сегодня уроков НЕТ! 🥳',
  error: 'Упс, что-то пошло не так 😬',
} as const;

export const languages = {
  en,
  ru,
};

export type LanguageCode = keyof typeof languages;
