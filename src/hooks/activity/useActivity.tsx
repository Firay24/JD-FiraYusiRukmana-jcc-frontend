import { HttpResponse, useHttp } from "../http/useHttp";

type TSaveActivityResponse = {
  id: string;
};

type TSaveActivity = {
  id?: string;
  studentId: string;
  competitionId: string;
  attedance?: boolean;
  score?: number;
  incorrect?: null;
  correct?: null;
  pathAnswer?: null;
};

export const useActivity = () => {
  const { post } = useHttp();

  const save = async (data: TSaveActivity) => {
    try {
      const response: HttpResponse<TSaveActivityResponse> = await post("https://api.jrchampionship.id/v1/activity/save", data);
      return response;
    } catch (error) {
      console.error("Save failed:", error);
      throw error;
    }
  };

  return { save };
};
