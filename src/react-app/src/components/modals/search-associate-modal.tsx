import { useEffect, useState } from "react";
import SFTextInput from "../form/sf-text-input";

const SearchAssociateModal = ({ show, onClose }: { show: boolean, onClose: any }) => {
  const [showModal, setShowModal] = useState(show);
  const [associateName, setAssociateName] = useState("");

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  useEffect(() => {

  }, []);

  return (
    <div className={`modal ${showModal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card" style={{width: '60%'}}>
        <header className="modal-card-head">
          <p className="modal-card-title">Busqueda de Socio</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <SFTextInput id="search-associate-name" name="Nombre del Asociado"
            value={associateName}
            onEnter={() => console.log("Hi!")}
            onChange={(value) => setAssociateName(value)} />
          <table className="table is-hoverable is-fullwidth">
            <thead>
              <th>Id</th>
              <th>Nombre</th>
              <th>Direcci&oacute;n</th>
              <th>Convenio</th>
            </thead>
            <tbody>
              {}
            </tbody>
          </table>
        </section>
        <footer className="modal-card-foot">
        </footer>
      </div>
    </div>
  );
};

export default SearchAssociateModal;