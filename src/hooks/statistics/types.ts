interface TotalPerStage {
  TK: number;
  SD: number;
  SMP: number;
}

interface TotalPerLevel {
  SMP: Record<number, number>;
  TK: Record<number, number>;
  SD: Record<number, number>;
}

interface TotalPerSubject {
  ips: number;
  matematika: number;
  "bahasa inggris": number;
  ipa: number;
}

interface ReportDetail {
  ips?: number;
  matematika?: number;
  "bahasa inggris"?: number;
  ipa?: number;
}

interface ReportPerStage {
  [level: number]: ReportDetail;
}

interface Report {
  SMP: Record<number, ReportDetail>;
  TK: Record<number, ReportDetail>;
  SD: Record<number, ReportDetail>;
}

export interface IReportDataResponse {
  totalPerStage: TotalPerStage;
  totalPerLevel: TotalPerLevel;
  totalPerSubject: TotalPerSubject;
  grandTotal: number;
  subjects: string[];
  report: Report;
}
