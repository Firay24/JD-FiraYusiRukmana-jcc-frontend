import { StatusPayment } from "@/types/global";

export interface IParticipant {
  id: string;
  name: string;
  idMember: string;
  idParticipant: string;
  school: string;
  class: string;
  stage: string;
  phoneNumber: string;
  nik: string;
  payment: {
    id: string;
    status: StatusPayment;
    invoice: string;
    amount: number;
    date: number;
  };
  competition: {
    id: string;
    name: string;
    subject: {
      id: string;
      name: string;
    };
    season: {
      id: string;
      name: string;
    };
    region: {
      id: string;
      name: string;
    };
    date: number;
    location: string;
  };
}

export interface IListAllParticipant {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  data: IParticipant[];
}

export interface ISaveBatch {
  id: string;
  totalParticipant: number;
  amount: number;
}

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
  idjcc: string;
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

interface Competition {
  id: string;
  name: string;
  price: number;
  stage: string;
  level: number;
  student: {
    name: string;
    username: string;
    class: string;
    stage: string;
  };
  season: {
    id: string;
    name: string;
  };
  subject: {
    id: string;
    name: string;
  };
  region: {
    id: string;
    name: string;
  };
}

interface DetailStatus {
  status: string;
  date: number;
}

export interface IDetailPayment {
  id: string;
  invoice: string;
  date: number;
  amount: number;
  status: StatusPayment;
  competition: Competition[];
  detailStatus: DetailStatus[];
  latestStatus: DetailStatus;
}

export interface IListActivityStudent {
  id: string;
  statusPayment: StatusPayment;
  score: number;
  pathAnswer: string;
  competition: {
    id: string;
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

export interface Participant {
  id: string;
  score: number;
  idMember: string;
  name: string;
  school: string;
  class: string;
  stage: string;
  regional: string;
}

export interface IListParticipant {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  data: Participant[];
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
