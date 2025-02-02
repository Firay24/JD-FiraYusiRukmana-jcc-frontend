import { HttpResponse, useHttp } from "../http/useHttp";
import { useRouter } from "next/navigation";
import { IPaymentPayload } from "./type";

interface SavePaymentResponse {
  id: string;
}

export const usePayment = () => {
  const router = useRouter();
  const { put } = useHttp();

  const save = async ({ id, payload }: { id: string; payload: IPaymentPayload }) => {
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

  return { save };
};
