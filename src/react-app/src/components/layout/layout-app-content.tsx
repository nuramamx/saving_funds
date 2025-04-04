import { Outlet, useLocation } from "react-router-dom";
import LayoutAppSidebar from "./layout-app-sidebar";
import { SidebarRoutes } from "../../routes";
import useIsMobile from "../../core/hooks/use-is-mobile";

export default function LayoutAppContent() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const basePage = (location: any): string => {
    let parts: string[] = location.pathname.split('/');
    let basePage: string = `/${parts[1]}`;

    return basePage;
  };
  const logo: string = `${process.env.PUBLIC_URL}/resources/images/logo.png`;

  return (
    <>
    <div className="column is-2">
      <LayoutAppSidebar location={basePage(location)} items={SidebarRoutes} />
    </div>
    <div className="column is-10">
      <section className="section box is-flex is-flex-direction-column" style={{minHeight: '90vh'}}>
      <Outlet></Outlet>
      </section>
    </div>
    </>
  );
}