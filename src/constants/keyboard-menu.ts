import { Keyboard } from 'grammy';

export const keyboardMenu = [
  ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
  ['Сегодня', 'Сейчас', 'Завтра', 'Ещё'],
];

export const keyboard = Keyboard.from(
  keyboardMenu.map((row) => row.map(Keyboard.text))
)
  .resized()
  .persistent();
