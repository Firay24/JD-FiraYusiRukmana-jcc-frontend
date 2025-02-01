import { HttpResponse, useHttp } from "../http/useHttp";
import { useRouter } from "next/navigation";
import { IStudentInfo, PrfoileResponse, TPayloadSave } from "./type";

export const useStudent = () => {
  const router = useRouter();
  const { get, post } = useHttp();

  const profileDashboard = async () => {
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

  const profile = async () => {
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

  const save = async (payload: TPayloadSave) => {
    try {
      const response: HttpResponse<IStudentInfo> = await post("/student/save", payload);
      return response;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  return { profileDashboard, save, profile };
};
