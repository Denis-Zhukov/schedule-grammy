export const getDifferenceInHoursAndMinutes = (date1: Date, date2: Date) => {
  const time1 = date1.getHours() * 60 + date1.getMinutes();
  const time2 = date2.getHours() * 60 + date2.getMinutes();
  const diffInMinutes = time2 - time1;

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  return { hours, minutes };
};
