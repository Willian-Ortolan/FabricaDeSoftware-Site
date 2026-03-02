import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Sider width={250} style={{ background: "#1f3a8a" }}>
      <div style={{ color: "white", padding: 20, fontSize: 20 }}>
        AgroDrones
      </div>

      <Menu
        theme="dark"
        mode="inline"
        onClick={({ key }) => navigate(key)}
        items={[
          { key: "/", icon: <HomeOutlined />, label: "Home" },
          { key: "/servicos", icon: <AppstoreOutlined />, label: "Serviços" },
          { key: "/admin", icon: <SettingOutlined />, label: "Admin" },
          { key: "/cliente", icon: <UserOutlined />, label: "Área do Cliente" },
        ]}
      />
    </Sider>
  );
}
