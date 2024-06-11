import { useState } from "react";
import { Erase, InfoCircle, Search } from "iconoir-react";
import { SFNumberInputInfo } from "../form/interfaces/sf-input-info";
import SearchAssociateModal from "../modals/search-associate-modal";

const SearchAssociate = ({id, name, value, readonly, onChange}: SFNumberInputInfo) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="control">
        <input id={id} className="input" type="text" placeholder={name}
          readOnly={readonly} />
      </div>
    </div>
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button className="pagination-previous"><Erase /></button>
      <button className="pagination-next" onClick={() => setShowModal(true)}><Search /></button>
      <ul className="pagination-list">
        <li>
          <button className="pagination-link"><InfoCircle /></button>
        </li>
      </ul>
    </nav>
    <SearchAssociateModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  )
};

export default SearchAssociate;