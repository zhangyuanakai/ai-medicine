// src/services/auth.ts
import request from "@/services/request";
import { LoginRequest, LoginResponse } from "@/types/auth";

export const loginApi = (data: LoginRequest) => {
  return request.post<LoginResponse>("/auth/login", data);
};
