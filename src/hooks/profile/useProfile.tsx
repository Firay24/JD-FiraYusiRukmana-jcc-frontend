import { BASE_API } from "@/constants/base.api";
import { HttpResponse, useHttp } from "../http/useHttp";
import { TPayloadUpdateProfile, TProfile } from "./type";

interface IProfileUser {
  message: string;
  statusCode: number;
  data: TProfile;
}

export const useProfileStore = () => {
  // Hooks
  const { put } = useHttp();

  const update = async (payload: TPayloadUpdateProfile) => {
    try {
      const response: HttpResponse<IProfileUser> = await put(`${BASE_API}/v1/user/update`, payload);
      if (response.statusCode !== 200) {
        throw new Error(`Gagal menyimpan data user: ${response.message}`);
      } else {
        const data = response;
        return data;
      }
    } catch (error) {
      console.error("Save Data User failed:", error);
      throw error;
    }
  };
  return { update };
};
