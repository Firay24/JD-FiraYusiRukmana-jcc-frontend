export type TPayloadSave = {
  id?: string;
  address: string;
  stage: string;
  class: string;
  nik: string;
  schoolId: string;
  fatherName: string;
  motherName: string;
  idUser: string;
};

export interface PrfoileResponse {
  nama: string;
  username: string;
  poin: number;
  totalActivity: number;
  avarageScore: number;
  gender: boolean;
}

export interface LevelInfo {
  level: string;
  currentPoints: number;
  maxPoints: number;
  progressPercentage: number;
}

export interface IStudentInfo {
  name: string;
  username: string;
  gender: boolean;
  birthdate: number;
  phoneNumber: string;
  address: string;
  school: string;
  stage: string;
  class: string;
  nik: string;
  fatherName: string;
  motherName: string;
  photoPath: string;
  poin: number;
  id?: string;
  userId: string;
}

export interface IGetStudentInfo {
  name: string;
  username: string;
  gender: boolean;
  birthdate: number;
  phoneNumber: string;
  address: string;
  school: string;
  idSchool: string;
  stage: string;
  class: string;
  nik: string;
  fatherName: string;
  motherName: string;
  photoPath: string;
  poin: number;
  id: string;
  userId: string;
}

export interface IParticipants {
  name: string;
  username: string;
  class: string;
  stage: string;
  subject: string;
}

export interface IParticipantsList {
  regional: string;
  participant: IParticipants[];
}
