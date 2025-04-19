import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toTitleCase } from "@/utils/toTitleCase";
import { parse } from "path";

export interface IParticipantsClasses {
  idMember: string;
  name: string;
  school: string;
  stage: string;
  class: string;
  room: string;
  mapel: string;
}

export const exportClassToExcel = (data: IParticipantsClasses[], fileName = "peserta-jcc-class.xlsx") => {
  const sheetData = data.map((item, index) => ({
    ID: `J${item.idMember.padStart(4, "0")}`,
    Nama: toTitleCase(item.name),
    Kelas: `${item.stage} ${item.stage === "SMP" ? Number(item.class) + 6 : item.class || "-"}`,
    Sekolah: item.school,
    Ruang: item.room,
    Matpel: item.mapel.toUpperCase(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Kelas Peserta JCC");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};
