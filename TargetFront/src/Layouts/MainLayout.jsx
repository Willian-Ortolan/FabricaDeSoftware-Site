import { Outlet } from "react-router-dom";
import Sidebar from "../Components/SideBar/Sidebar";
import ResponsiveSidebarLayout from "../Components/Layout/ResponsiveSidebarLayout";

export default function MainLayout() {
  return (
    <ResponsiveSidebarLayout Sidebar={Sidebar} mobileTitle="AgroDrones">
      <Outlet />
    </ResponsiveSidebarLayout>
  );
}
