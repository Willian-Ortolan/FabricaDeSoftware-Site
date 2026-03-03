import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  EnvironmentOutlined,
  PictureOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  PlayCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const menuItems = [
  { key: "/cliente", icon: <HomeOutlined />, label: "Dashboard" },
  { key: "/cliente/solicitacoes", icon: <FileTextOutlined />, label: "Solicitações" },
  { key: "/cliente/propriedades", icon: <EnvironmentOutlined />, label: "Propriedades" },
  { key: "/cliente/mapas", icon: <PictureOutlined />, label: "Mapas Gerados" },
  { key: "/cliente/relatorios", icon: <BarChartOutlined />, label: "Relatórios" },
  { key: "/cliente/configuracoes", icon: <SettingOutlined />, label: "Configurações" },
];

export default function ClientSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedKey = menuItems.some((i) => i.key === pathname) ? pathname : "/cliente";

  return (
    <Sider
      width={260}
      style={{
        background: "linear-gradient(180deg, #0b1f4a 0%, #0f2760 45%, #102a6b 100%)",
        boxShadow: "4px 0 18px rgba(0, 0, 0, 0.35)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "24px 24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "white" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            AD
          </div>
          <span style={{ fontSize: 18, fontWeight: 700 }}>AgroDrones</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 12,
            color: "rgba(255,255,255,0.8)",
            fontSize: 13,
          }}
        >
          <PlayCircleOutlined style={{ fontSize: 14 }} />
          <span>Conta</span>
        </div>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => navigate(key)}
        style={{
          background: "transparent",
          borderRight: "none",
          padding: "12px 12px 24px",
          flex: 1,
        }}
        items={menuItems}
      />

      <div style={{ padding: "0 24px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 0",
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserOutlined style={{ fontSize: 22, color: "white" }} />
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 600, fontSize: 14 }}>João Silva</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Cliente</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/contratar")}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
            color: "white",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <PlusOutlined />
          Nova Solicitação
        </button>
      </div>

      <div
        style={{
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
