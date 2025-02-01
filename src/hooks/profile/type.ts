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
  username: string;
  name: string;
  email?: string;
  password?: string;
  roleId?: string;
  birthdate: string | number;
  gender: boolean;
  phoneNumber: string;
};
