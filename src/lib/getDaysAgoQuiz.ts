export function getDaysAgoQuiz(date: Date) {
  const now = new Date();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const differenceInDays = Math.floor(
    (now.getTime() - date.getTime()) / millisecondsPerDay
  );

  if (differenceInDays <= 0) {
    return "Today";
  }

  if (differenceInDays === 1) {
    return "1 day ago";
  }

  return `${differenceInDays} days ago`;
}