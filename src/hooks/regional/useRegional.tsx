import { IRegional } from "@/types/global";
import { HttpResponse, useHttp } from "../http/useHttp";
import { useRouter } from "next/navigation";

export const useRegional = () => {
  const router = useRouter();
  const { get } = useHttp();

  const listRegional = async () => {
    try {
      const response: HttpResponse<IRegional[]> = await get("/regional/list");
      return response.data;
    } catch (error) {
      console.error("Get failed:", error);
      throw error;
    }
  };

  return { listRegional };
};
