import React from "react";
import { HttpResponse, useHttp } from "../http/useHttp";
import { Role } from "@/types/role";

export const useRole = () => {
  const { get } = useHttp();

  const role = async () => {
    try {
      const response: HttpResponse<Role[]> = await get("/public/role/list");
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return { role };
};
