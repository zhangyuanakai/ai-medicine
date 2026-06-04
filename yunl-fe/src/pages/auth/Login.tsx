import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "@/types";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: LoginRequest) => {
    try {
      console.log(values, "values");
      if (values.password === "ww" && values.username === "ww") {
        localStorage.setItem("token", JSON.stringify(values));
      }
      message.success("登录成功");
      navigate("/"); // 登录后跳转
    } catch (error: any) {
      message.error(error?.response?.data?.message || "登录失败");
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
