import { Outlet, useLocation } from "react-router-dom";

export default function SystemManagement() {
  const location = useLocation();
  const route: string = "/system";

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