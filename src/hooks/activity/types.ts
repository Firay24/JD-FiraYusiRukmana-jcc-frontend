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
