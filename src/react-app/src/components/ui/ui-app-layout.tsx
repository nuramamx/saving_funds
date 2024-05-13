import { Outlet, useLocation } from 'react-router-dom';
import UIAppSidebar, { SidebarMenu } from './ui-app-sidebar';

const menuItems: SidebarMenu[] = [
    { route: "/associate", name: "Socios", location: "/associate", children: [
        { route: "/associate/page", name: "Gestión de Socios", location: undefined, children: undefined },
    ] },
    { route: "/borrow", name: "Préstamos", location: "/associate", children: [
        { route: "/borrow/page", name: "Gestión de Préstamos", location: undefined, children: undefined },
        { route: "/borrow/page", name: "Préstamos Autorizados", location: undefined, children: undefined },
        { route: "/borrow/page", name: "Estado de Préstamos", location: undefined, children: undefined },
        { route: "/borrow/page", name: "Socios Deudores", location: undefined, children: undefined },
        { route: "/borrow/page", name: "Ver Pagos", location: undefined, children: undefined }
    ] },
    { route: "/withdrawal", name: "Retiros", location: "/associate", children: [
        { route: "/withdrawal/page", name: "Gestión de Retiros", location: undefined, children: undefined },
        { route: "/withdrawal/page", name: "Ver Retiros", location: undefined, children: undefined }
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
        <div className="columns">
            <div className="column is-one-fifth">
                <UIAppSidebar location={basePage(location)} items={menuItems} />
            </div>
            <div className="column box">
                <Outlet></Outlet>
            </div>
        </div>
        </>
    );
}