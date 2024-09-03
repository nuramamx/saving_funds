import { Outlet, useLocation } from "react-router-dom";

export default function SavingFundManagement() {
  const location = useLocation();
  const route: string = "/savingfund";

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