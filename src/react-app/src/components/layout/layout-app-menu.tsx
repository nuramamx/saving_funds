import { Community, AppleWallet, Settings, ReportColumns, UserCircle } from 'iconoir-react';
import React, { memo, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import useLayoutStore from '../../core/stores/layout-store';

const LayoutAppMenu = memo(() => {
const { selectedMenu, setSelectedMenu, restoreMenu, restoreSidebarMenu } = useLayoutStore();

useLayoutEffect(() => {
  restoreMenu();
}, []);

const handleMenuClick = (menu: string) => {
  setSelectedMenu(menu);
  restoreSidebarMenu();
};

return (
  <div id="ui-app-menu" className="navbar-menu">
    <div className="navbar-start">
      <div className="navbar-item">
        <Link to="/" className={`navbar-item ${selectedMenu === 'dashboard' ? 'is-selected' : ''}`}
          onClick={() => handleMenuClick('dashboard')}>
          <ReportColumns />&nbsp;
          Dashboard
        </Link>
      </div>
      <div className="navbar-item">
        <Link to="/associate" className={`navbar-item ${selectedMenu === 'associate' ? 'is-selected' : ''}`}
          onClick={() => handleMenuClick('associate')}>
          <Community />&nbsp;
          Administraci&oacute;n de Socios
        </Link>
      </div>
      <div className="navbar-item">
        <a href="/savingfunds" className={`navbar-item ${selectedMenu === 'savingfunds' ? 'is-selected' : ''}`}>
          <AppleWallet />&nbsp;
          Administraci&oacute;n de Fondo de Ahorro
        </a>
      </div>
      <div className="navbar-item">
        <Link to="/system" className={`navbar-item ${selectedMenu === 'system' ? 'is-selected' : ''}`}>
          <Settings />&nbsp;
          Sistema
        </Link>
      </div>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <Link to="/myaccount" className={`button is-light navbar-item ${selectedMenu === 'myaccount' ? 'is-selected' : ''}`}
            onClick={() => handleMenuClick('myaccount')}>
            <UserCircle />&nbsp;
            Mi Cuenta
          </Link>
        </div>
      </div>
    </div>
  </div>
);
});

export default LayoutAppMenu;