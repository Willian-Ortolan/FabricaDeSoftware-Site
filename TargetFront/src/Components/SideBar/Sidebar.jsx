import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  RadarChartOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { SIDEBAR_GRADIENT, SIDEBAR_WIDTH } from "./sidebarTheme";

const { Sider } = Layout;

export default function Sidebar({ plain = false, onNavigate }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleMenuClick({ key }) {
    navigate(key);
    onNavigate?.();
  }

  const content = (
    <div
      className={plain ? "site-sidebar-inner site-sidebar-inner--plain" : "site-sidebar-inner"}
      style={{
        background: plain ? SIDEBAR_GRADIENT : undefined,
        ["--sidebar-accent"]: "#60a5fa",
      }}
    >
      <div className="site-sidebar-brand">
        <div className="site-sidebar-logo site-sidebar-logo--fallback">AD</div>
        <div className="site-sidebar-brand-text">
          <div className="site-sidebar-brand-name">AgroDrones</div>
          <div className="site-sidebar-brand-subtitle">
            Pulverização &amp; Mapeamento Aéreo
          </div>
        </div>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        className="site-sidebar-menu"
        selectedKeys={[pathname]}
        onClick={handleMenuClick}
        items={[
          { key: "/", icon: <HomeOutlined />, label: "Home" },
          { key: "/servicos", icon: <AppstoreOutlined />, label: "Serviços" },
          { key: "/SobreNos", icon: <RadarChartOutlined />, label: "Sobre Nós" },
          { key: "/contratar", icon: <PhoneOutlined />, label: "Contratar" },
          { key: "/login", icon: <UserOutlined />, label: "Login" },
        ]}
      />

      <div className="site-sidebar-footer">© 2024 AgroDrones</div>
    </div>
  );

  if (plain) return content;

  return (
    <Sider
      className="site-sidebar"
      width={SIDEBAR_WIDTH}
      style={{
        background: SIDEBAR_GRADIENT,
        ["--sidebar-accent"]: "#60a5fa",
      }}
    >
      {content}
    </Sider>
  );
}
