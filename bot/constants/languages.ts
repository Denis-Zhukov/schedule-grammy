import { format } from 'date-fns-tz';

import { classes } from '@bot/constants/classes';
import { weekOfDay } from '@bot/types';
import { escapeMarkdownV2 } from '@bot/utils/escape-markdown';

export const en = {
  myCommands: {
    b: 'Buttons disappeared',
    chooseTeacher: 'Choose a teacher',
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
    `Hello, *${escapeMarkdownV2(name)}* 🤗\nThis bot is designed to help you with the schedule at school SSH\\-27`,
  menuSet: 'Buttons have been set',
  moreInlineKeyboard: {
    imTeacher: "I'm a teacher",
    adminSchedule: 'Duty administrator',
    callSchedule: 'Call schedule',
    chooseTeacher: 'Choose a teacher',
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
  noAccount: 'Your account is not found. Write a command: /start',
  youFollowNow: (surname: string, name: string, patronymic: string) =>
    escapeMarkdownV2(`You have followed ${surname} ${name} ${patronymic} now`),
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
    const teacher = `${surname} ${name[0]}.${patronymic?.[0]}.`;

    const start = format(timeStart, 'HH:mm');
    const end = format(timeEnd, 'HH:mm');

    return `${classes[className] ?? className}*${escapeMarkdownV2(subclass)}* ${escapeMarkdownV2(lesson)} ${escapeMarkdownV2(classroom)} \`${escapeMarkdownV2(teacher)}\` _ __${start}\\-${end}__ _${
      canteen ? '\n\t\t\t\t\t\t*Take to the canteen* 🍽' : ''
    }${lead ? '\n\t\t\t\t\t\t*To lead from school* 🏃‍➡️' : ''}`;
  },
  openControlPanel: 'Open control panel',
  holiday: "Today's classes are __CANCELLED__\\! 🥳",
  chooseTeacher: 'Choose a teacher',
  noTeachers: 'Unfortunately, there are no teachers on the list at the moment',
  now: 'Now',
  teacherNotChoose:
    'You have not selected a teacher\nYou must select a teacher first\nClick the "More" button and choose a teacher',
  noLessonsNow: (hours: number, minutes: number) =>
    `There is no lesson now\\. Until the next lesson: ${hours > 0 ? `${hours} h\\. ` : ''} ${minutes > 0 ? `${minutes} min\\.` : ''}`,
  chill: "*There's nothing else for today\\. Let's rest\\!* 🫶",
  toCanteen: 'This class must be taken to the canteen 🍽',
  toLead: 'This class must be lead from school 🏃‍➡',
  error: 'Oops, something went wrong 😬',
  back: 'Back',
};

export const ru: typeof en = {
  myCommands: {
    b: 'Пропали кнопки',
    chooseTeacher: 'Выбрать учителя',
    adminSchedule: 'Дежурный администратор',
    callSchedule: 'Расписание звонков',
    contacts: 'Контакты',
  },
  user: 'Пользователь',
  greetings: (name: string) =>
    `Привет, *${escapeMarkdownV2(name)}* 🤗\nДанный бот предназначен помочь вам с расписанием в школе СШ\\-27`,
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
  noAccount: 'Ваш аккаунт не найден. Напишите команду: /start',
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
    const teacher = `${surname} ${name[0]}.${patronymic?.[0]}.`;

    const start = format(timeStart, 'HH:mm');
    const end = format(timeEnd, 'HH:mm');

    return `${classes[className] ?? className}*${escapeMarkdownV2(subclass)}* ${escapeMarkdownV2(lesson)} ${escapeMarkdownV2(classroom)} \`${escapeMarkdownV2(teacher)}\` _ __${start}\\-${end}__ _${
      canteen ? '\n\t\t\t\t\t\t*Отвести в столовку* 🍽' : ''
    }${lead ? '\n\t\t\t\t\t\t*Вывести из школы* 🏃‍➡️' : ''}`;
  },
  openControlPanel: 'Открыть панель управления',
  holiday: 'Сегодня уроков __НЕТ__\\! 🥳',
  chooseTeacher: 'Выберите учителя',
  noTeachers: 'К сожалению, на данный момент в списке нет учителей',
  now: 'Сейчас:',
  teacherNotChoose:
    'Вы не выбрали учителя\nСперва необходимо выбрать учителя\nНажмите кнопку "Ещё" и выберите учителя',
  noLessonsNow: (hours: number, minutes: number) =>
    `Сейчас урока нет\\. До следущего урока: ${hours > 0 ? `${hours} ч\\. ` : ''} ${minutes > 0 ? `${minutes} мин\\.` : ''}`,
  chill: '*На сегодня больше ничего нет\\. Отдыхаем\\!* 🫶',
  toCanteen: 'Этот класс нужно отвести в столовую 🍽',
  toLead: 'Этот класс нужно вывести из школы 🏃‍➡',
  error: 'Упс, что-то пошло не так 😬',
  back: 'Назад',
} as const;

export const languages = {
  en,
  ru,
};

export type LanguageCode = keyof typeof languages;
