import { BASE_API } from "@/constants/base.api";
import { HttpResponse, useHttp } from "../http/useHttp";
import { TPayloadUpdateProfile, TProfile } from "./type";
import { useRouter } from "next/navigation";

export const useProfileStore = () => {
  // Hooks
  const { put } = useHttp();
  const router = useRouter();

  const update = async (payload: TPayloadUpdateProfile) => {
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
  return { update };
};
