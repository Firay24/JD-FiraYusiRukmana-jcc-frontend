import { HttpResponse, useHttp } from "../http/useHttp";
import { IActivityCreateDto, IDetailActivity, IListActivity, IListParticipant, TSaveActivity } from "./types";

type TSaveActivityResponse = {
  id: string;
};

type TCreateAcitivityResponse = {
  id: string;
};

export const useActivity = () => {
  const { post, get } = useHttp();

  const save = async (data: TSaveActivity) => {
    try {
      const response: HttpResponse<TSaveActivityResponse> = await post("/activity/save", data);
      return response.data;
    } catch (error) {
      console.error("Save failed:", error);
      throw error;
    }
  };

  const detail = async (id: string) => {
    try {
      const response: HttpResponse<IDetailActivity> = await get(`/activity/detail/${id}`);
      return response.data;
    } catch (error) {
      console.error("Save failed:", error);
      throw error;
    }
  };

  const listbyidstudent = async ({ page, limit }: { page?: number; limit?: number }) => {
    try {
      const response: HttpResponse<IListActivity> = await get(`/activity/list?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Save failed:", error);
      throw error;
    }
  };

  const create = async (data: IActivityCreateDto) => {
    try {
      const response: HttpResponse<TCreateAcitivityResponse> = await post("/activity/create", data);
      return response.data;
    } catch (error) {
      console.error("Create failed:", error);
      throw error;
    }
  };

  const participant = async ({ page, limit, idCompetition }: { page?: number; limit?: number; idCompetition: string }) => {
    try {
      const response: HttpResponse<IListParticipant> = await get(`/activity/participant?page=${page}&limit=${limit}&idCompetition=${idCompetition}`);
      return response.data;
    } catch (error) {
      console.error("Save failed:", error);
      throw error;
    }
  };

  return { save, detail, listbyidstudent, create, participant };
};
