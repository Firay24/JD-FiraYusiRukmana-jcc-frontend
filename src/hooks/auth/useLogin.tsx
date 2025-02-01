import { useAuthStore } from "@/state/auth.state";
import { HttpResponse, useHttp } from "../http/useHttp";
import { RoleType } from "@/constants/global.enums";
import { useRouter } from "next/navigation";

interface LoginResponse {
  username: string;
  role: {
    id: string;
    name: string;
  };
}

interface LoggedResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  name: string;
}

export const useLogin = () => {
  const router = useRouter();
  const { setProfile } = useAuthStore();
  const { post, get } = useHttp();

  const login = async (username: string, password: string) => {
    try {
      const response: HttpResponse<LoginResponse> = await post("/auth/sign-in", { username, password });
      if (response.data.role.name === RoleType.PARTICIPANT) router.push("/member");
      if (response.data.role.name === RoleType.EVENTADMIN) router.push("/event-admin");
      if (response.data.role.name === RoleType.FACILITATOR) router.push("/facilitator");
      // setToken(response.data.token);
      setProfile(response.data);
      return response;
    } catch (error) {
      // console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await post("/auth/sign-out");
      setProfile(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const logged = async () => {
    try {
      const response: HttpResponse<LoggedResponse> = await get("/auth/logged");
      return response.data;
    } catch {
      null;
    }
  };

  return { login, logout, logged };
};
