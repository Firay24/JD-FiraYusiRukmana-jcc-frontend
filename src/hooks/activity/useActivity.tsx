import { HttpResponse, useHttp } from "../http/useHttp";
import { TSaveActivity } from "./types";

type TSaveActivityResponse = {
  id: string;
};

export const useActivity = () => {
  const { post } = useHttp();

  const save = async (data: TSaveActivity) => {
    try {
      const response: HttpResponse<TSaveActivityResponse> = await post("/activity/save", data);
      return response;
    } catch (error) {
      console.error("Save failed:", error);
      throw error;
    }
  };

  return { save };
};
