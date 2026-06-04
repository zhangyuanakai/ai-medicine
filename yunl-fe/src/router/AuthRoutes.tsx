import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import { Navigate } from "react-router-dom";

const AuthRoutes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { index: true, element: <Navigate to="/login" replace /> }, // 默认重定向到 /login
    ],
  },
];

export default AuthRoutes;