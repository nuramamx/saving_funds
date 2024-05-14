import { Outlet, useLocation } from 'react-router-dom';
import UIAppSidebar, { SidebarParentMenu, SidebarChildMenu } from './ui-app-sidebar';

const menuItems: SidebarParentMenu[] = [
    { name: "Reportes", location: "/", children: [
        { route: "/report/1", name: "Reporte de X" },
        { route: "/report/2", name: "Reporte de Y" },
    ] },
    { name: "Socios", location: "/associate", children: [
        { route: "/associate/page", name: "Gestión de Socios" },
    ] },
    { name: "Préstamos", location: "/associate", children: [
        { route: "/borrow/page", name: "Gestión de Préstamos" },
        { route: "/borrow/page", name: "Préstamos Autorizados" },
        { route: "/borrow/page", name: "Estado de Préstamos" },
        { route: "/borrow/page", name: "Socios Deudores" },
        { route: "/borrow/page", name: "Ver Pagos" }
    ] },
    { name: "Retiros", location: "/associate", children: [
        { route: "/withdrawal/page", name: "Gestión de Retiros" },
        { route: "/withdrawal/page", name: "Ver Retiros" }
    ] },
    { name: "General", location: "/myaccount", children: [
        { route: "/myaccount/page", name: "Mis Datos" }
    ] },
];

export default function UIAppLayout() {
    const location = useLocation();
    const basePage = (location: any): string => {
        let parts: string[] = location.pathname.split('/');
        let basePage: string = `/${parts[1]}`;

        return basePage;
    };
    const logo: string = `${process.env.PUBLIC_URL}/resources/images/logo.png`;

    return (
        <>
        <div className="column is-3">
            <UIAppSidebar location={basePage(location)} items={menuItems} />
        </div>
        <div className="column is-9">
            <section className="section box" style={{minHeight: '80vh'}}>
            <Outlet></Outlet>
            </section>
        </div>
        </>
    );
}