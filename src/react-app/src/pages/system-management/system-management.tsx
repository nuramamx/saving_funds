import { Outlet, useLocation } from "react-router-dom";

export default function SystemManagement() {
  const location = useLocation();
  const route: string = "/system";

  return (
    <>
    {route === location.pathname ? (
      <div style={{ textAlign: 'center' }}>
        <img src={`${process.env.PUBLIC_URL}/setepid-logo.jpg`} />
      </div>
    ) : null}
    <Outlet></Outlet>
    </>
  );
}