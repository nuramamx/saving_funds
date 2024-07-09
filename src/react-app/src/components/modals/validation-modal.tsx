import { memo } from "react";
import useValidationModalStore from "../../core/stores/validation-modal-store";

const ValidationModal = memo(() => {
  const { validation, closeValidationModal } = useValidationModalStore();

  const handleCloseClick = () => {
    closeValidationModal();
  }

  return (
    <div className={`modal ${validation.show ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card" style={{width: '60%'}}>
        <header className="modal-card-head">
          <p className="modal-card-title">{validation.title ?? "Errores de validación"}</p>
          <button className="delete" aria-label="close" onClick={handleCloseClick}></button>
        </header>
        <section className="modal-card-body">
        {validation.message}

          <div className="content">
            {validation.errors !== null && validation.errors !== undefined && validation.errors.length > 0 && (
              <ul>
                {validation.errors.map((error, index) => (
                  <li key={`error-${index}`}>{error}</li>
                ))}
              </ul>
            )}
            <br />
            {validation.data !== null && validation.data !== undefined && (
              <div className="block is-size-7">
                Las siguientes reglas no se cumplieron, si tiene dudas contacte al desarrollador:<br />
                <span className="has-text-danger">{JSON.stringify(validation.data).replaceAll('"', '')}</span>
              </div>
            )}
          </div>
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button className="button is-success" onClick={handleCloseClick}>Aceptar</button>
          </div>
        </footer>
      </div>
    </div>
  );
});

export default ValidationModal;