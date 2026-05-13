import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  RadarChartOutlined,
  EnvironmentOutlined,
  ExperimentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Sider
      width={260}
      style={{
        background:
          "linear-gradient(180deg, #0b1f4a 0%, #0f2760 45%, #102a6b 100%)",
        boxShadow: "4px 0 18px rgba(0, 0, 0, 0.35)",
      }}
    >
      <div
        style={{
          padding: "24px 24px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "white",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "999px",
            border: "2px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          AD
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>AgroDrones</div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.7)",
              marginTop: 2,
            }}
          >
            Pulverização &amp; Mapeamento Aéreo
          </div>
        </div>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        style={{
          background: "transparent",
          borderRight: "none",
          padding: "12px 12px 24px",
        }}
        selectedKeys={[pathname]}
        onClick={({ key }) => navigate(key)}
        items={[
          { key: "/", icon: <HomeOutlined />, label: "Home" },
          {
            key: "/servicos",
            icon: <AppstoreOutlined />,
            label: "Serviços",
          },
          {
            key: "/SobreNos",
            icon: <RadarChartOutlined />,
            label: "Sobre Nós",
          },
          // {
          //   key: "/mapeamento",
          //   icon: <EnvironmentOutlined />,
          //   label: "Mapeamento",
          // },
          // {
          //   key: "/pulverizacao",
          //   icon: <ExperimentOutlined />,
          //   label: "Pulverização",
          // },
          {
            key: "/contratar",
            icon: <PhoneOutlined />,
            label: "Contratar",
          },
          {
            key: "/login",
            icon: <UserOutlined />,
            label: "Login",
          },
          // {
          //   key: "/admin",
          //   icon: <SettingOutlined />,
          //   label: "Admin",
          // },
        ]}
      />

      <div
        style={{
          marginTop: "auto",
          padding: "0 24px 24px",
          color: "rgba(255,255,255,0.6)",
          fontSize: 12,
        }}
      >
        © 2024 AgroDrones
      </div>
    </Sider>
  );
}
