import { Outlet, useLocation } from "react-router-dom";

export default function SavingFundManagement() {
  const location = useLocation();
  const route: string = "/associate";

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