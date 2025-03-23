import { Participant } from "@/hooks/activity/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import LogoImg from "../../public/logo-water.png";

export const generatePDF = async (data: Participant[], namefile: string, region: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.text(`Hasil JUNIO Regional ${region} ${namefile.replaceAll("-", " ")}`, 14, 10);

  // **Hapus duplikasi berdasarkan ID**
  const uniqueData = data.filter((item, index, self) => index === self.findIndex((t) => t.idMember === item.idMember));

  // **Konversi data ke format array untuk autoTable**
  const tableData = uniqueData.map((item: Participant, index: number) => [index + 1, item.idMember.padStart(4, "0"), item.name, item.school, item.score]);

  // **Tambahkan tabel ke PDF**
  autoTable(doc, {
    startY: 20,
    head: [["No", "ID JCC", "Nama", "Asal Sekolah", "Nilai"]],
    body: tableData,
  });

  const imgWidth = 50; // Sesuaikan ukuran gambar
  const imgHeight = 18.47;
  const margin = 10;
  const cols = Math.floor((pageWidth - margin * 6) / imgWidth); // Jumlah kolom per baris
  const rows = Math.floor((pageHeight - margin * 12) / imgHeight); // Jumlah baris per halaman

  let x = margin;
  let y = margin;

  for (let i = 0; i < cols * rows; i++) {
    if (i > 0 && i % cols === 0) {
      x = margin;
      y += imgHeight + margin; // Turun ke baris berikutnya
    }

    if (y + imgHeight > pageHeight - margin) {
      doc.addPage(); // Tambah halaman jika penuh
      y = margin;
    }

    doc.addImage(LogoImg.src, "PNG", x, y, imgWidth, imgHeight);
    x += imgWidth + margin;
  }

  // **Unduh PDF**
  doc.save(`pemenang-junio-regional${region}-${namefile}.pdf`);
};
