import { useState } from "react";
import { Button, Drawer, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useLayoutBreakpoint } from "../../hooks/useLayoutBreakpoint";
import { SIDEBAR_WIDTH } from "../SideBar/sidebarTheme";

const { Content } = Layout;

export default function ResponsiveSidebarLayout({
  Sidebar,
  mobileTitle = "Menu",
  children,
}) {
  const { isMobile } = useLayoutBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && <Sidebar />}
      <Layout style={{ minWidth: 0 }}>
        {isMobile && (
          <div className="mobile-nav-bar">
            <Button
              type="text"
              icon={<MenuOutlined />}
              aria-label="Abrir menu"
              onClick={() => setDrawerOpen(true)}
              className="mobile-nav-menu-btn"
            />
            <span className="mobile-nav-title">{mobileTitle}</span>
          </div>
        )}
        <Content className="app-main-content">{children}</Content>
      </Layout>
      {isMobile && (
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={closeDrawer}
          width={SIDEBAR_WIDTH}
          styles={{ body: { padding: 0 } }}
          className="site-sidebar-drawer"
        >
          <Sidebar plain onNavigate={closeDrawer} />
        </Drawer>
      )}
    </Layout>
  );
}
