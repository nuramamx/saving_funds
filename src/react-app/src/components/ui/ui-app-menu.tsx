export default function UIAppMenu() {
    return (
        <div id="ui-app-menu" className="navbar-menu">
            <div className="navbar-start">
                <a href="/" className="navbar-item">
                    Dashboard
                </a>
                <div className="navbar-item is-hoverable">
                    <a href="/associate" className="navbar-item">
                        Administraci&oacute;n de Socios
                    </a>
                </div>
                <div className="navbar-item is-hoverable">
                    <a className="navbar-item">
                        Administraci&oacute;n de Fondo de Ahorro
                    </a>
                </div>
                <div className="navbar-item is-hoverable">
                    <a className="navbar-item">
                        Sistema
                    </a>
                </div>
            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <a className="button is-light">
                            Mi Cuenta
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}