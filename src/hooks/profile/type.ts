export type TProfile = {
  username: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
  birthdate: string;
  gender: boolean;
  phoneNumber: string;
};

export type TPayloadUpdateProfile = {
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  roleId?: string;
  birthdate?: number;
  gender?: boolean;
  phoneNumber?: string;
};

export type TUser = {
  id: string;
  username: string;
  name: string;
  email: string;
  birthday: number;
  gender: boolean;
  phoneNumber: string;
  role: {
    id: string;
    name: string;
  };
};

export type TSchool = {
  id: string | null;
  name: string | null;
};
