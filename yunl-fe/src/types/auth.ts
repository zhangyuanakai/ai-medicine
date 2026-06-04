export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  phone: string;
  email: string;
  nickname: string;
  registerTime: string;
  lastLoginTime: string;
  lastLoginIp: string | null;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}
