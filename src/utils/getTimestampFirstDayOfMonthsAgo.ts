export const getTimestampFirstDayOfMonthsAgo = (monthsNumber = 3) => {
  const currentDate = new Date();
  const monthsAgo = new Date();
  monthsAgo.setMonth(currentDate.getMonth() - monthsNumber);

  const firstDayOfMonthsAgo = new Date(monthsAgo.getFullYear(), monthsAgo.getMonth(), 1);

  const firstDayOfMonthsAgoTimestamp = firstDayOfMonthsAgo.getTime();

  return firstDayOfMonthsAgoTimestamp;
};
