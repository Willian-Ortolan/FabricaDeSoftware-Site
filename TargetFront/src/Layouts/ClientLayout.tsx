import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import ClientSidebar from "../Components/SideBar/ClientSidebar";

const { Content } = Layout;

export default function ClientLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ClientSidebar />
      <Layout>
        <Content style={{ background: "#f0f4fb", minHeight: "100vh" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
