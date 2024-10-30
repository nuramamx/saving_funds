import { memo } from "react";
import LayoutAppMenu from "./layout-app-menu";

const LayoutAppHeader = memo(() => {
  return (
    <header>
      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="SETEPID"
              width="30"
              height="20"
            />&nbsp;
            <strong>SETEPID | Sistema de Fondo de Ahorro</strong>
          </div>
        </div>
        <LayoutAppMenu />
      </nav>
    </header>
  );
});

export default LayoutAppHeader;