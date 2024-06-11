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
        {validation.errors.length > 0 && (
          <ul >
            {validation.errors.map((error, index) => (
              <li key={`error-${index}`}>{error}</li>
            ))}
          </ul>
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