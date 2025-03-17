import { useEffect, useState } from "react";
import { useAuth } from "../../components/security/auth-context";
import { ToSHA1 } from "../../core/util/conversions/sha1-conversion";
import AppConstants from "../../core/constants/app-constants";
import CommandResponseInfo from "../../core/interfaces/info/command-response-info";
import UserDataByUserAndPasswordSpec from "../../core/interfaces/specs/base/user-data-by-user-and-password-spec";

export default function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [, setIsBlurred] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setIsBlurred(true);

    try {
      const response = await fetch(`${AppConstants.apiSecurity}/token`, {
        method: 'POST',
        body: JSON.stringify({
          user: username,
          password: await ToSHA1(password!)
        })
      });

      const responseData = await response.json() as CommandResponseInfo;
      const user = responseData.data as UserDataByUserAndPasswordSpec;

      setLoading(false);

      if (!response.ok) {
        return setError(responseData.message);
      }

      login(user);
      window.location.href = '/savingfund/savingfund';
    } catch (err: any) {
      setError('No se pudo iniciar sesión, verifique la conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated)
      window.location.href = '/savingfund/savingfund';
  }, []);

  return (
    <section>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <div className="has-text-centered mb-5">
                <img
                  src={`${process.env.PUBLIC_URL}/logo.png`}
                  alt="SETEPID"
                  width="350"
                  height="350"
                />
              </div>

              <div className="box">
                <div className="field">
                  <label className="label">Usuario</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Ingresa tu usuario"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Contrase&ntilde;a</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <p style={{ color: '#C0392B', textAlign: 'center' }}><label>{error}</label></p>
                <br />

                <div className="field">
                  <div className="control">
                    <button className="button login-button is-primary is-fullwidth" onClick={handleLogin}>
                    {!loading ? 'Aceptar' : (<div className="loader"></div>)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}