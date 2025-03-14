import { HttpResponse, useHttp } from "../http/useHttp";
import { useRouter } from "next/navigation";
import { IDetailPayment, IGetAllPayment, IPaymentPayload } from "./type";

interface SavePaymentResponse {
  id: string;
}

export const usePayment = () => {
  const router = useRouter();
  const { put, get } = useHttp();

  const updateStatus = async ({ id, payload }: { id: string; payload: IPaymentPayload }) => {
    try {
      const response: HttpResponse<SavePaymentResponse> = await put(`/payment/update/${id}`, payload);
      return response;
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
      const response: HttpResponse<IDetailPayment> = await get(`/payment/get/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("Get detail failed:", error);
      throw error;
    }
  };

  const allbyuser = async () => {
    try {
      const response: HttpResponse<IGetAllPayment[]> = await get(`/payment/user`);
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 401) {
        router.push("/auth/sign-in");
      }
      console.error("Get detail failed:", error);
      throw error;
    }
  };

  return { updateStatus, detail, allbyuser };
};
