import { IStudentInfo, PrfoileResponse } from "@/types/student";
import { HttpResponse, useHttp } from "../http/useHttp";
import { useRouter } from "next/navigation";
import { useLogin } from "../auth/useLogin";
import { useAuthStore } from "@/state/auth.state";

export const useStudent = () => {
  const router = useRouter();
  const { get } = useHttp();

  const profile = async () => {
    try {
      const response: HttpResponse<PrfoileResponse> = await get("/student/dashboard/profile");
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  const save = async () => {
    try {
      const response: HttpResponse<IStudentInfo> = await get("/student/profile");
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  return { profile, save };
};
