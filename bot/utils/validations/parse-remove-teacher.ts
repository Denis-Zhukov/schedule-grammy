import { z } from 'zod';

const userStringSchema = z.string().regex(/^[1-9]\d{0,16}$/, {
  message: 'Input must match the format: "ID"',
});

export const parseRemoveTeacherString = (input: string = '') => {
  userStringSchema.parse(input);

  return { id: +input };
};
