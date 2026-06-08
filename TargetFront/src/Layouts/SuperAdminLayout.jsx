import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { removeToken } from "../utils/auth";

const { Header, Content } = Layout;

export default function SuperAdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/");
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0f172a",
          paddingInline: 24,
        }}
      >
        <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
          Super Admin — Target
        </span>
        <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: "white" }}>
          Sair
        </Button>
      </Header>
      <Content style={{ background: "#f5f7fa", padding: 24 }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
