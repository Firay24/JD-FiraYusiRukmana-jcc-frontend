export const convertDateToEpoch = (dateString: string): number => {
  return Math.floor(new Date(dateString).getTime() / 1000);
};
