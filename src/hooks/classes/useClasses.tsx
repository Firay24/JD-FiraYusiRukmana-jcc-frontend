import { useRouter } from "next/navigation";
import { HttpResponse, useHttp } from "../http/useHttp";

export interface IClass {
  id: string;
  name: string;
}

interface IAssignRoomDto {
  competitionId: string;
  mode: string;
  roomId?: string;
  startIndex?: number;
  endIndex?: number;
  idMembers?: string[];
  newRoomName?: string;
}

interface IAssignRoom {
  competitionRoomId: string;
  assigned: number;
}

export const useClasses = () => {
  const router = useRouter();
  const { get, post } = useHttp();

  const listClasses = async () => {
    try {
      const response: HttpResponse<IClass[]> = await get("/classes/list");
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  const assignParticipant = async (data: IAssignRoomDto) => {
    try {
      const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== null && v !== undefined && v !== ""));
      const response: HttpResponse<IAssignRoom> = await post("/classes/assign", cleanData);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("No authenticated:", error);
      throw error;
    }
  };

  return { listClasses, assignParticipant };
};
