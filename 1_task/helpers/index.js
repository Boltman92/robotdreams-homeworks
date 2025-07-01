export function isSameWeek(timestamps, timestamp2) {
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(d.setDate(diff));
  };

  const date2 = new Date(timestamp2);
  const week2Start = getWeekStart(date2);
  week2Start.setHours(0, 0, 0, 0);

  return timestamps.some((timestamp1) => {
    const date1 = new Date(timestamp1);
    const week1Start = getWeekStart(date1);
    week1Start.setHours(0, 0, 0, 0);
    return week1Start.getTime() === week2Start.getTime();
  });
}

export function isSameMonth(timestamps, timestamp2) {
  const getMonthKey = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${date.getMonth()}`;
  };

  const month2Key = getMonthKey(timestamp2);

  return timestamps.some((timestamp1) => {
    const month1Key = getMonthKey(timestamp1);
    return month1Key === month2Key;
  });
}

export function showResponseAndExit(response) {
  console.log(response);
  process.exit();
}
