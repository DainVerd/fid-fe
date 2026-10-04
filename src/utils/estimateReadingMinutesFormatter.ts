export const formatEstimateReadingMinutes = (minutes: number): string => {
  if (!minutes) return '—';
  debugger;
  if (minutes < 60) return `${minutes} min`;

  let hours = 0;
  let leftMinutes = minutes;
  while (leftMinutes >= 60) {
    hours++;
    leftMinutes -= 60;
  }

  return `${hours}h ${leftMinutes}min`;
};
