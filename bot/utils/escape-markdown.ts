export const escapeMarkdownV2 = (text: string): string => {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, (match) => `\\${match}`);
};
