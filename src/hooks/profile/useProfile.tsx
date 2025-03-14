import { BASE_API } from "@/constants/base.api";
import { HttpResponse, useHttp } from "../http/useHttp";
import { TPayloadUpdateProfile, TProfile, TUser } from "./type";
import { useRouter } from "next/navigation";

export const useProfileStore = () => {
  // Hooks
  const { put, get } = useHttp();
  const router = useRouter();

  const user = async () => {
    try {
      const response: HttpResponse<TUser> = await get("/user/user");
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  const updateUser = async (payload: TPayloadUpdateProfile) => {
    try {
      const response: HttpResponse<TProfile> = await put("/user/update", payload);
      return response;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };
  return { updateUser, user };
};
