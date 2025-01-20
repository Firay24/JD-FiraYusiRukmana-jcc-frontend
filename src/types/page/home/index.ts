export interface TTimeLine {
  id: number;
  date: number;
  nama_sekolah: string;
  regionals: {
    regional: number;
    address: {
      kota: string;
      provinsi: string;
      kecamatan: string;
      desa: string;
    };
  }[];
}
