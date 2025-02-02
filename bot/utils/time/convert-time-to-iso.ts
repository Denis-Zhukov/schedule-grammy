export const convertTimeToISO = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  return new Date(1970, 0, 1, hours, minutes);
};
