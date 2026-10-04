import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  RadarChartOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEmpresa } from "../../contexts/EmpresaContext";
import {
  SIDEBAR_GRADIENT,
  SIDEBAR_WIDTH,
  resolveMenuSelectedKey,
} from "./sidebarTheme";
import { publicConfig } from "../../config";

const { Sider } = Layout;

export default function TenantSidebar({ plain = false, onNavigate }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { nome, logoUrl, corPrimaria, path } = useEmpresa();

  const homeKey = path();
  const menuItems = [
    { key: homeKey, icon: <HomeOutlined />, label: "Home" },
    { key: path("servicos"), icon: <AppstoreOutlined />, label: "Serviços" },
    { key: path("SobreNos"), icon: <RadarChartOutlined />, label: "Sobre Nós" },
    { key: path("contratar"), icon: <PhoneOutlined />, label: "Contratar" },
    {
      key: publicConfig.erpLoginUrl,
      icon: <UserOutlined />,
      label: "Acessar ERP",
    },
  ];

  const selectedKey = resolveMenuSelectedKey(pathname, menuItems, homeKey);

  const iniciais = (nome || "AD")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleMenuClick({ key }) {
    if (key === publicConfig.erpLoginUrl) {
      window.location.assign(key);
      return;
    }
    navigate(key);
    onNavigate?.();
  }

  const content = (
    <div
      className={plain ? "site-sidebar-inner site-sidebar-inner--plain" : "site-sidebar-inner"}
      style={{
        background: plain ? SIDEBAR_GRADIENT : undefined,
        ["--sidebar-accent"]: corPrimaria || "#60a5fa",
      }}
    >
      <div className="site-sidebar-brand">
        {logoUrl ? (
          <img src={logoUrl} alt={nome} className="site-sidebar-logo" />
        ) : (
          <div className="site-sidebar-logo site-sidebar-logo--fallback">{iniciais}</div>
        )}
        <div className="site-sidebar-brand-text">
          <div className="site-sidebar-brand-name">{nome}</div>
          <div className="site-sidebar-brand-subtitle">
            Pulverização &amp; Mapeamento Aéreo
          </div>
        </div>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        className="site-sidebar-menu"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        items={menuItems}
      />

      <div className="site-sidebar-footer">
        © {new Date().getFullYear()} {nome}
      </div>
    </div>
  );

  if (plain) return content;

  return (
    <Sider
      className="site-sidebar"
      width={SIDEBAR_WIDTH}
      style={{
        background: SIDEBAR_GRADIENT,
        ["--sidebar-accent"]: corPrimaria || "#60a5fa",
      }}
    >
      {content}
    </Sider>
  );
}
