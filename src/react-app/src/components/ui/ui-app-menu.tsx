import { Community, AppleWallet, Settings, ReportColumns, UserCircle } from 'iconoir-react';

export default function UIAppMenu() {
    return (
        <div id="ui-app-menu" className="navbar-menu">
            <div className="navbar-start">
                <a href="/" className="navbar-item">
                    <ReportColumns />&nbsp;
                    Dashboard
                </a>
                <div className="navbar-item is-hoverable">
                    <a href="/associate" className="navbar-item">
                        <Community />&nbsp;
                        Administraci&oacute;n de Socios
                    </a>
                </div>
                <div className="navbar-item is-hoverable">
                    <a className="navbar-item">
                        <AppleWallet />&nbsp;
                        Administraci&oacute;n de Fondo de Ahorro
                    </a>
                </div>
                <div className="navbar-item is-hoverable">
                    <a className="navbar-item">
                        <Settings />&nbsp;
                        Sistema
                    </a>
                </div>
            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <a href="/myaccount" className="button is-light">
                            <UserCircle />&nbsp;
                            Mi Cuenta
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}