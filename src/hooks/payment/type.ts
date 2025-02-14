import { StatusPayment } from "@/types/global";

export interface IPaymentPayload {
  status: StatusPayment;
}

interface competition {
  id: string;
  name: string;
  price: number;
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

interface detailStatus {
  status: StatusPayment;
  date: number;
}

export interface IDetailPayment {
  id: string;
  invoice: string;
  date: number;
  amount: number;
  status: StatusPayment;
  competition: competition[];
  detailStatus: detailStatus[];
  latestStatus: {
    status: StatusPayment;
    date: number;
  };
}

export interface IGetAllPayment {
  id: string;
  invoice: string;
  date: number;
  amount: number;
  status: StatusPayment;
}
