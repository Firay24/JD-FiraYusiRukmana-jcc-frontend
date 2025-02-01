export const convertDateToEpoch = (dateString: string): number => {
  return new Date(dateString).getTime();
};
