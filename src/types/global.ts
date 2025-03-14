export interface Profile {
  id?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: Role;
}

export enum StatusPayment {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
}

export type RoleId = "1" | "2" | "3";

export type RoleName = "SUPERADMIN" | "ADMIN" | "EVENTADMIN" | "PARTICIPANT" | "FACILITATOR";

export interface Role {
  id: RoleId;
  name: RoleName;
}

export interface MediaUrl {
  url: string;
}

export interface PaginatedResponse<T> {
  total: number;
  list: T[];
}

export interface Store<T, F extends Record<string, (...args: any[]) => any>> {
  data: T;
  fn: F;
}

export interface ILabelValue {
  value: any;
  label: any;
}

export interface ProfileStudent {
  id?: string;
  idUser?: string;
  username: string;
  name: string;
  email?: string;
  birthdate: number;
  gender: boolean;
  phoneNumber: string;
  address: string;
  photoPath: string;
  idSchool: string;
  school: string;
  stage: "TK" | "SD" | "SMP" | undefined;
  class: string;
  nik: string;
  fatherName: string;
  motherName: string;
}

export interface ISelectReactForm {
  value: string;
  label: string;
}

export interface IRegional {
  id: string;
  name: string;
  region: number;
  regionDetail: string;
}
