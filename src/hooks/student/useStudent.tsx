import { HttpResponse, useHttp } from "../http/useHttp";
import { useRouter } from "next/navigation";
import { IGetStudentInfo, IParticipantsList, IStudentInfo, IStudentParticipants, PrfoileResponse, TPayloadSave } from "./type";

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
      const response: HttpResponse<IGetStudentInfo> = await get("/student/profile");
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      // console.error("No authenticated:", error);
      // throw error;
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

  const listParticipantByKolektif = async (paymentId: string) => {
    try {
      const response: HttpResponse<IParticipantsList> = await get(`/student/payment/${paymentId}`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  const listParcipants = async ({ seasonId, regionId }: { seasonId: string; regionId: string }) => {
    try {
      const response: HttpResponse<IStudentParticipants[]> = await get(`/student/list/all?seasonId=${seasonId}&regionId=${regionId}`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  return { profileDashboard, save, profile, listParticipantByKolektif, listParcipants };
};
