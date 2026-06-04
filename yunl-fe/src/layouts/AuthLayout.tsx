import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const { Content } = Layout;

const AuthLayout = () => (
  <Layout style={{ height: "100vh" }}>
    <Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Outlet />
    </Content>
  </Layout>
);

export default AuthLayout;
