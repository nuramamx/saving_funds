import { memo } from "react";
import useConfirmModalStore from "../../core/stores/confirm-modal-store";

type ConfirmModalParams = {
  show: boolean;
  title: string;
  message: string;
  onResponse: (response: boolean) => void;
};

const ConfirmModal = memo(({ show, title, message, onResponse }: ConfirmModalParams) => {
  const handleCloseClick = (response: boolean) => {
    if (onResponse) onResponse(response);
  };

  return (
    <div className={`modal ${show ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card" style={{width: '60%'}}>
        <header className="modal-card-head">
          <p className="modal-card-title">{title ?? "Errores de validación"}</p>
          <button className="delete" aria-label="close" onClick={() => handleCloseClick(false)}></button>
        </header>
        <section className="modal-card-body">
          {message}
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button className="button" onClick={() => handleCloseClick(false)}>Cancelar</button>
            <button className="button is-success" onClick={() => handleCloseClick(true)}>Aceptar</button>
          </div>
        </footer>
      </div>
    </div>
  );
});

export default ConfirmModal;