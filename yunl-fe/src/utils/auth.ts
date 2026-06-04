export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token"); // 模拟登录状态
};
