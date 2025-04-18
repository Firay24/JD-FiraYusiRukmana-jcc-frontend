import { useRouter } from "next/navigation";
import { HttpResponse, useHttp } from "../http/useHttp";
import { IActivityCreateDto, IDetailActivity, IListActivity, IListAllParticipant, IListParticipant, ISaveBatch, TSaveActivity } from "./types";

type TSaveActivityResponse = {
  id: string;
};

type TCreateAcitivityResponse = {
  id: string;
};

export const useActivity = () => {
  const router = useRouter();
  const { post, get } = useHttp();

  const save = async (data: TSaveActivity) => {
    try {
      const response: HttpResponse<TSaveActivityResponse> = await post("/activity/save", data);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  const detail = async (id: string) => {
    try {
      const response: HttpResponse<IDetailActivity> = await get(`/activity/detail/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  const listbyidstudent = async ({ page, limit }: { page?: number; limit?: number }) => {
    try {
      const response: HttpResponse<IListActivity> = await get(`/activity/list?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  const create = async (data: IActivityCreateDto) => {
    try {
      const response: HttpResponse<TCreateAcitivityResponse> = await post("/activity/create", data);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  const participant = async (params: { page?: number; limit?: number; idCompetition?: string; stage?: string; level?: string; subjectId?: string; search?: string }) => {
    try {
      const queryParams = new URLSearchParams(
        Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== null)
          .reduce(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {} as Record<string, string>,
          ),
      );

      const response: HttpResponse<IListParticipant> = await get(`/activity/participant?${queryParams.toString()}`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  const listAll = async (params: { page?: number; limit?: number; seasonId?: string; regionId?: string; stage?: string; level?: string; subjectId?: string; search?: string; date?: number }) => {
    try {
      // Filter hanya parameter yang memiliki nilai
      const queryParams = new URLSearchParams(
        Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== null)
          .reduce(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {} as Record<string, string>,
          ),
      );

      const response: HttpResponse<IListAllParticipant> = await get(`/activity/list/all?${queryParams.toString()}`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  const uploadBatch = async (file: File, schoolId: string, seasonId: string, regionId: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("schoolId", schoolId);
    formData.append("seasonId", seasonId);
    formData.append("regionId", regionId);

    try {
      const response: HttpResponse<ISaveBatch> = await post("/activity/batch-save", formData);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  return { save, detail, listbyidstudent, create, participant, listAll, uploadBatch };
};
