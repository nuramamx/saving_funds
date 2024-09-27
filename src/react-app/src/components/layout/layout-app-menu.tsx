import React, { memo, useLayoutEffect, useState } from 'react';
import { Community, AppleWallet, Settings, ReportColumns, UserCircle, LogOut } from 'iconoir-react';
import { Link } from 'react-router-dom';
import useLayoutStore from '../../core/stores/layout-store';

const LayoutAppMenu = memo(() => {
  const [isActive, setIsActive] = useState<boolean>(true);
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
            <div className={`dropdown is-right ${isActive ? 'is-active': ''}`}>
              <div className="dropdown-trigger">
                <button className="button is-light" onClick={(e) => setIsActive(!isActive)} aria-haspopup="true" aria-controls="dropdown-menu"><UserCircle />&nbsp;Mi cuenta</button>&nbsp;&nbsp;
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <div className="dropdown-item">
                    <strong>
                      ADMIN
                    </strong>
                  </div>
                  <hr className="dropdown-divider" />
                  <button className='button is-light myaccount-item' style={{ background: 'none', width: '100%' }}><LogOut />&nbsp;Cerrar sesi&oacute;n</button>
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