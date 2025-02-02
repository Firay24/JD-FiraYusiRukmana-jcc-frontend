export const convertEpochToDateShort = ({ epoch, showtime = false }: { epoch: number; showtime: boolean }) => {
  const date = new Date(epoch * 1000); // Convert epoch ke milidetik
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
  const year = date.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;

  if (showtime) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    formattedDate += ` ${hours}:${minutes}`;
  }

  return formattedDate;
};

export const convertEpochToDateLong = (epoch: number) => {
  const date = new Date(epoch * 1000); // Convert epoch (detik) ke milidetik
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("id-ID", options);
};
