import { Outlet, useLocation } from 'react-router-dom';
import UIAppSidebar from './ui-app-sidebar';
import { SidebarRoutes } from '../../routes';

export default function UIAppContent() {
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
            <UIAppSidebar location={basePage(location)} items={SidebarRoutes} />
        </div>
        <div className="column is-9">
            <section className="section box" style={{minHeight: '80vh'}}>
            <Outlet></Outlet>
            </section>
        </div>
        </>
    );
}