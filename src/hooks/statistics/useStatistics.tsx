import { HttpResponse, useHttp } from "../http/useHttp";
import { useRouter } from "next/navigation";
import { IReportDataResponse } from "./types";

export const useStatistics = () => {
  const router = useRouter();
  const { get } = useHttp();

  const statisticReport = async (idRegional: string) => {
    try {
      const response: HttpResponse<IReportDataResponse> = await get(`/statistics/${idRegional}`);
      return response.data;
    } catch (error) {
      console.error("Get failed:", error);
      throw error;
    }
  };

  return { statisticReport };
};
