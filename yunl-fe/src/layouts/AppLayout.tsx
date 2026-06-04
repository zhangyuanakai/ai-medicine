import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const navigate = useNavigate(); // 修正：补全 useNavigate()
  const [collapsed, setCollapsed] = useState<boolean>(false); // 修正：删掉多余的 false

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        {" "}
        {/* 修正：补全 onCollapse */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            {
              key: "dashboard",
              label: "Dashboard",
              icon: <MailOutlined />,
              onClick: () => navigate("/"),
            },
            {
              key: "inventoryManagement",
              label: "库存管理",
              icon: <SettingOutlined />,
              onClick: () => navigate("/inventoryManagement"),
            },
            {
              key: "inventoryManagement1",
              label: "库存管理1", // 区分名称，避免重复
              icon: <SettingOutlined />,
              onClick: () => navigate("/inventoryManagement1"),
            },
            {
              key: "aiMedicine",
              label: "AI问药",
              icon: <AppstoreOutlined />,
              onClick: () => navigate("/aiMedicine"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff" }}>后台系统</Header>
        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
