import axios, { AxiosRequestConfig } from "axios";

// 接口统一响应结构
export interface HttpResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器：加上 token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：仅返回 data.data
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.statusCode !== 200) {
      return Promise.reject(new Error(res.message || "Request failed"));
    }
    return res.data;
  },
  (error) => Promise.reject(error)
);

// ✅ 封装通用请求方法
const request = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return instance.get<any, T>(url, config);
  },

  post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.post<any, T>(url, data, config);
  },

  put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.put<any, T>(url, data, config);
  },

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return instance.delete<any, T>(url, config);
  },
};

export default request;
