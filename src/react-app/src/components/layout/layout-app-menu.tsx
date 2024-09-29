import React, { memo, useLayoutEffect, useState } from 'react';
import { Community, Settings, UserCircle, LogOut } from 'iconoir-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../security/auth-context';
import useLayoutStore from '../../core/stores/layout-store';
import useCacheStore from '../../core/stores/cache-store';

const LayoutAppMenu = memo(() => {
  const { logout } = useAuth();
  const { selectedMenu, setSelectedMenu, restoreMenu, restoreSidebarMenu } = useLayoutStore();
  const { reset: resetCache } = useCacheStore();
  const { reset: resetLayout } = useLayoutStore(); 
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    restoreSidebarMenu();
  };

  const handleLogout = () => {
    logout();
    resetCache();
    resetLayout();
    window.location.href = '/login';
  }

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
            <div className={`dropdown is-right ${isActive ? 'is-active': ''}`}>
              <div className="dropdown-trigger">
                <button className="button is-light" onClick={(e) => setIsActive(!isActive)} aria-haspopup="true" aria-controls="dropdown-menu"><UserCircle />&nbsp;Mi cuenta</button>&nbsp;&nbsp;
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <button className='button is-light myaccount-item' style={{ background: 'none', width: '100%' }} onClick={handleLogout}><LogOut />&nbsp;Cerrar sesi&oacute;n</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LayoutAppMenu;