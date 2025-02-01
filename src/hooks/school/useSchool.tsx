import { BASE_API } from "@/constants/base.api";
import { HttpResponse, useHttp } from "../http/useHttp";
import { TList } from "./type";

interface ISchool {
  message: string;
  statusCode: number;
  data: TList[];
}

export const useSchollStore = () => {
  // Hooks
  const { get } = useHttp();

  const list = async (stage: string) => {
    try {
      const response: HttpResponse<ISchool> = await get(`${BASE_API}/v1/school/list?stage=${stage}`);
      if (response.statusCode !== 200) {
        throw new Error(response.message);
      } else {
        const data = response.data;
        return data;
      }
    } catch (error) {
      console.error("Get List failed:", error);
      throw error;
    }
  };

  return { list };
};
