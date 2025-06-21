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
}

export interface ICompetitionRank {
  competitionName: string;
  subject: string;
  stage: string;
  level: number;
  rank: IRank[];
}

export interface IWinner {
  name: string;
  studentId: string;
  school: string;
  class: string;
  stage: string;
  category: string;
  score: number;
  certifNumber: number;
}

export interface IListWinner {
  idCompetition: string;
  name: string;
  level: number;
  stage: string;
  region: string;
  date: number;
  location: string;
  subject: string;
  winner: IWinner[];
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

  const listWinner = async (regionId: string) => {
    try {
      const response: HttpResponse<IListWinner[]> = await get(`/achievement/winner/${regionId}`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  return { statisticReport, statisticRank, listWinner };
};
