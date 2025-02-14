import { StatusPayment } from "@/types/global";

export type TSaveActivity = {
  id?: string;
  studentId: string;
  competitionId: string;
  attedance?: boolean;
  score?: number;
  incorrect?: null;
  correct?: null;
  pathAnswer?: null;
};

export interface IStatusPayment {
  status: StatusPayment;
  date: number;
}

export interface IDetailActivity {
  id: string;
  participantId: string;
  paymentId: string;
  paymentDate: number;
  invoice: string;
  student: {
    name: string;
    school: string;
    class: string;
    stage: string;
    phoneNumber: string;
    nik: string;
  };
  events: {
    name: string;
    season: string;
    region: string;
    price: number;
    level: number;
    stage: string;
    subject: string;
    date: number;
    location: string;
    room: string;
    supervisor: string;
  };
  detailStatus: IStatusPayment[];
  latestStatus: IStatusPayment;
}

export interface IListActivityStudent {
  id: string;
  statusPayment: StatusPayment;
  competition: {
    name: string;
    description: string;
    date: number;
    subject: string;
    season: string;
    location: string;
    region: {
      name: string;
      region: number;
    };
  };
}

export interface IListActivity {
  page: number;
  limit: number;
  total: number;
  data: IListActivityStudent[];
}

export interface IActivityCreateDto {
  id?: string;
  studentId: string;
  competitionId: string[];
  competitionRommId?: string;
  paymentId?: string;
  attedance: boolean;
  score?: number;
  correct?: number;
  incorrect?: number;
  pathAnswer?: string;
  amount?: number;
}
