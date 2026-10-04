import { Outlet } from "react-router-dom";
import { EmpresaProvider, useEmpresa } from "../contexts/EmpresaContext";
import TenantSidebar from "../Components/SideBar/TenantSidebar";
import ResponsiveSidebarLayout from "../Components/Layout/ResponsiveSidebarLayout";

function TenantLayoutInner() {
  const { nome } = useEmpresa();

  return (
    <ResponsiveSidebarLayout
      Sidebar={TenantSidebar}
      mobileTitle={nome || "Menu"}
    >
      <Outlet />
    </ResponsiveSidebarLayout>
  );
}

export default function TenantLayout() {
  return (
    <EmpresaProvider>
      <TenantLayoutInner />
    </EmpresaProvider>
  );
}
