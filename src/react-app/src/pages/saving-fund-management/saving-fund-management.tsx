import { Outlet, useLocation } from "react-router-dom";

export default function SavingFundManagement() {
  const location = useLocation();
  const route: string = "/savingfund";

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