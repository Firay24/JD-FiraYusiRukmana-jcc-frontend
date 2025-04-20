import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IStudentParticipants } from "@/hooks/student/type";
import { toTitleCase } from "./toTitleCase";

export const exportToExcel = (data: IStudentParticipants[], fileName = "peserta-jcc.xlsx") => {
  const sheetData = data.map((item, index) => ({
    ID: `J${item.idMember.padStart(4, "0")}`,
    Nama: toTitleCase(item.name),
    Sekolah: item.school,
    Kelas: `${item.stage} Kelas ${item.class}`,
    Matpel1: item.subject[0].name || "",
    RoomMatpel1: item.subject[0].room || "",
    Matpel2: item.subject[1] ? item.subject[1].name : "",
    RoomMatpel2: item.subject[1] ? item.subject[1].room : "",
    Matpel3: item.subject[2] ? item.subject[2].name : "",
    RoomMatpel3: item.subject[2] ? item.subject[2].room : "",
    Matpel4: item.subject[3] ? item.subject[3].name : "",
    RoomMatpel4: item.subject[3] ? item.subject[3].room : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Peserta JCC");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};
