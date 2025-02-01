export type TProfileStudent = {
  id: string;
  name: string;
  username: string;
  gender: boolean;
  birthdate: string;
  phoneNumber: string;
  address: string;
  school: string;
  stage: string;
  class: string | number;
  nik: string;
  fatherName: string;
  motherName: string;
  photoPath: string | null;
  poin: number;
  userId: string;
};

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
