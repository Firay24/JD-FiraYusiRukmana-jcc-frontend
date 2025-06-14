function generateCertificateNumber(number: number, epochDate: number): string {
  const date = new Date(epochDate * 1000); // dikasli 1000 supaya jadi milidetik
  const month = date.getMonth();
  const year = date.getFullYear();

  const romanMonths = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

  const romanMonth = romanMonths[month];

  return `${number}/JCC/PRT/${romanMonth}/${year}`;
}

export default generateCertificateNumber;
