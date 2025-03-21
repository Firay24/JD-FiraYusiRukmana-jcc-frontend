import { Participant } from "@/hooks/activity/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = async (data: Participant[], namefile: string) => {
  const doc = new jsPDF();
  doc.text(`Data Peserta ${namefile.replaceAll("-", " ")}`, 14, 10);

  // Konversi data ke format array untuk autoTable
  const tableData = data.map((item: Participant, index: number) => [index + 1, item.name, item.stage, item.class, item.school, item.score]);

  // Tambahkan tabel ke PDF
  autoTable(doc, {
    startY: 20,
    head: [["No", "Nama", "Jenjang", "Kelas", "Asal Sekolah", "Nilai"]],
    body: tableData,
  });

  // Unduh PDF
  doc.save(`data-${namefile}.pdf`);
};
