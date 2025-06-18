import { HttpResponse, useHttp } from "../http/useHttp";
import { useRouter } from "next/navigation";
import { IReportDataResponse } from "./types";

interface IRank {
  id: string;
  name: string;
  school: string;
  score: number;
  attedance: boolean;
  ket: number;
  date: number;
  index: number;
}

export interface ICompetitionRank {
  competitionName: string;
  subject: string;
  stage: string;
  level: number;
  region: string;
  location: string;
  rank: IRank[];
}

export const useStatistics = () => {
  const router = useRouter();
  const { get } = useHttp();

  const statisticReport = async (idRegional?: string) => {
    try {
      const url = idRegional ? `/statistics/summary?id=${idRegional}` : `/statistics/summary`;
      const response: HttpResponse<IReportDataResponse> = await get(url);
      return response.data;
    } catch (error) {
      console.error("Get failed:", error);
      throw error;
    }
  };

  const statisticRank = async ({ seasonId, regionId }: { seasonId: string; regionId?: string }) => {
    try {
      const response: HttpResponse<ICompetitionRank[]> = await get(`/statistics/rank?seasonId=${seasonId}&regionId=${regionId}`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  return { statisticReport, statisticRank };
};
