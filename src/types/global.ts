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
