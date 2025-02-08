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

export interface IRegionalTimeline {
  id: number;
  regional: number;
  address: string;
  date: number;
  status: boolean;
  location: string;
  path: string;
  description: string;
  juknis: string;
  kisikisi?: Kisikisi[];
}

interface Kisikisi {
  label: string;
  path: string;
}
