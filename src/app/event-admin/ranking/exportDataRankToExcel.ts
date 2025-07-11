import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toTitleCase } from "@/utils/toTitleCase";
import { ICompetitionRank, IListWinner } from "@/hooks/statistics/useStatistics";
import generateCertificateNumber from "@/utils/generateCertificateNumber";

export const exportRankToExcel = (data: IListWinner[], fileName = "rank-jcc.xlsx") => {
  const sheetData: any[] = [];

  data.forEach((comp) => {
    const jenjang = `${comp.stage} ${comp.subject.toUpperCase()} ${comp.level}`;

    comp.winner.forEach((item, index) => {
      sheetData.push({
        Nama: toTitleCase(item.name),
        Sekolah: item.school,
        Jenjang: jenjang + `-JUARA ${index + 1}`,
        Skor: item.score,
        Sertif: `${generateCertificateNumber(item.certifNumber, comp.date)}`,
      });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "RANKING JCC");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};
