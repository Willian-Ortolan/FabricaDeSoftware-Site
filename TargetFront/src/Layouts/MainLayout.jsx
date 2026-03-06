import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/SideBar/Sidebar";

const { Content } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content style={{ background: "#f5f7fa" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
