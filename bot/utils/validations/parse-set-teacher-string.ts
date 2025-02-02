import { z } from 'zod';

const userStringSchema = z
  .string()
  .regex(
    /^[1-9]\d{0,16}\s[a-zA-Zа-яА-ЯёЁ]+\s[a-zA-Zа-яА-ЯёЁ]+\s[a-zA-Zа-яА-ЯёЁ]+$/,
    {
      message: 'Input must match the format: "ID Surname Name Patronymic"',
    },
  );

export const setParseUserString = (input: string = '') => {
  userStringSchema.parse(input);

  const [id, surname, name, patronymic] = input.trim().split(' ');

  return {
    id: +id,
    surname,
    name,
    patronymic,
  };
};
