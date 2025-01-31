import { format } from 'date-fns-tz';

import { classes } from '@bot/constants/classes';
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
    chooseTeacher: 'Choose teacher',
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
  gap: '🙌 *Gap*',
  youFollow: (surname: string, name: string, patronymic: string) =>
    `You follow ${surname} ${name} ${patronymic}`,
  youUnfollow: 'You do not follow anyone teacher',
  noAccount: 'Your account is not found',
  youFollowNow: (surname: string, name: string, patronymic: string) =>
    `You have followed ${surname} ${name} ${patronymic} now`,
  youAreTeacher: (surname: string, name: string, patronymic: string) =>
    `You are a teacher - ${surname} ${name} ${patronymic}`,
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

    const start = format(timeStart, 'HH:mm');
    const end = format(timeEnd, 'HH:mm');

    return `${classes[className] ?? className}*${subclass}* ${lesson} ${classroomName} \`${teacher}\` _ __${start}\\-${end}__ _${
      canteen ? '\n\t\t\t\t\t\t*Take you to the canteen* 🍽' : ''
    }${lead ? '\n\t\t\t\t\t\t*To lead from school* 🏃‍➡️' : ''}`;
  },
  back: 'Back',
  openControlPanel: 'Open control panel',
  holiday: "Today's classes are CANCELLED! 🥳",
  chooseTeacher: 'Choose a teacher',
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
    chooseTeacher: 'Выбрать учителя',
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
  youFollowNow: (surname: string, name: string, patronymic: string) =>
    `Вы теперь следите за ${surname} ${name} ${patronymic}`,
  gap: '🙌 *Форточка*',
  youFollow: (surname: string, name: string, patronymic: string) =>
    `Вы следите за ${surname} ${name} ${patronymic}`,
  youUnfollow: 'Вы не следите ни за одним учителем',
  noAccount: 'Ваш аккаунт не найден',
  youAreTeacher: (surname: string, name: string, patronymic: string) =>
    `Вы учитель - ${surname} ${name} ${patronymic}`,
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

    const start = format(timeStart, 'HH:mm');
    const end = format(timeEnd, 'HH:mm');

    return `${classes[className] ?? className}*${subclass}* ${lesson} ${classroomName} \`${teacher}\` _ __${start}\\-${end}__ _${
      canteen ? '\n\t\t\t\t\t\t*Отвести в столовку* 🍽' : ''
    }${lead ? '\n\t\t\t\t\t\t*Вывести из школы* 🏃‍➡️' : ''}`;
  },
  back: 'Назад',
  openControlPanel: 'Открыть панель управления',
  holiday: 'Сегодня уроков НЕТ! 🥳',
  chooseTeacher: 'Выберите учителя',
  error: 'Упс, что-то пошло не так 😬',
} as const;

export const languages = {
  en,
  ru,
};

export type LanguageCode = keyof typeof languages;
