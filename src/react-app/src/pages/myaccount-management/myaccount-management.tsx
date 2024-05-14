import { Outlet, useLocation } from "react-router-dom";

export default function MyAccountManagementPage() {
    const location = useLocation();
    const route: string = "/myaccount";

    return (
        <>
        {route === location.pathname ? (
            <div>
            </div>
        ) : null}
        <Outlet></Outlet>
        </>
    );
}