import { useRoutes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./AppRoutes";
import { isAuthenticated } from "@/utils/auth";

const Router = () => {
  return useRoutes([
    ...(isAuthenticated() ? AppRoutes : AuthRoutes),
  ]);
};

export default Router;
