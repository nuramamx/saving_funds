import { useState } from 'react';
import { Erase, InfoCircle, Search } from 'iconoir-react';
import { SFNumberInputInfo } from '../form/interfaces/sf-input-info';
import SearchAssociateModal from '../../pages/associate-management/associate-page/modals/search-associate-modal';
import SearchAssociateSpec from '../../core/interfaces/specs/search/search-associate-spec';

const SearchAssociate = ({id, name, value, readonly, onChange}: SFNumberInputInfo) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAssociate, setSelectedAssociate] = useState<SearchAssociateSpec>();

  const handleSelectedAssociate = (value: SearchAssociateSpec) => {
    setSelectedAssociate(value);

    if (onChange)
      onChange(value.id);
  };

  const handleEraseAssociate = () => {
    setSelectedAssociate({} as SearchAssociateSpec);
    if (onChange)
      onChange(0);
  };

  return (
    <>
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="control">
        <input id={id} className="input" type="text" placeholder={name} style={{fontSize: '13px'}}
          value={`${selectedAssociate?.id ?? ''}|${selectedAssociate?.fullname ?? ''}`}
          readOnly={readonly} />
      </div>
    </div>
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button className="pagination-previous"><Erase onClick={handleEraseAssociate} /></button>
      <button className="pagination-next" onClick={() => setShowModal(true)}><Search /></button>
      <ul className="pagination-list">
        <li>
          <button className="pagination-link"><InfoCircle /></button>
        </li>
      </ul>
    </nav>
    <SearchAssociateModal
      show={showModal}
      onSelectedAssociate={(value) => handleSelectedAssociate(value)}
      onClose={() => setShowModal(false)} />
    </>
  )
};

export default SearchAssociate;