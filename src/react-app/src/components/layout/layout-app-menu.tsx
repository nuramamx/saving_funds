import React, { memo, useLayoutEffect } from 'react';
import { Community, AppleWallet, Settings, ReportColumns, UserCircle } from 'iconoir-react';
import { Link } from 'react-router-dom';
import useLayoutStore from '../../core/stores/layout-store';

const LayoutAppMenu = memo(() => {
const { selectedMenu, setSelectedMenu, restoreMenu, restoreSidebarMenu } = useLayoutStore();

useLayoutEffect(() => {
  // restoreMenu();
}, []);

const handleMenuClick = (menu: string) => {
  setSelectedMenu(menu);
  restoreSidebarMenu();
};

return (
  <div id="ui-app-menu" className="navbar-menu">
    <div className="navbar-start">
      <div className="navbar-item">
        <div className="buttons">
          <Link to="/savingfund" className={`button is-light navbar-item ${selectedMenu === 'savingfund' ? 'is-selected' : ''}`}
            onClick={() => handleMenuClick('savingfund')}>
            <Community />&nbsp;
            Administraci&oacute;n
          </Link>
        </div>
      </div>
      <div className="navbar-item">
        <div className="buttons">
          <Link to="/system" className={`button is-light navbar-item ${selectedMenu === 'system' ? 'is-selected' : ''}`}
            onClick={() => handleMenuClick('system')}>
            <Settings />&nbsp;
            Sistema
          </Link>
        </div>
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