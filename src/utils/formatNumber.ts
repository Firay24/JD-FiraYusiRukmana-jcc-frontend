export const formatNumber = (amount: number, locales: string = "id-ID") => {
  const formatted = new Intl.NumberFormat(locales, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
  return formatted;
};
