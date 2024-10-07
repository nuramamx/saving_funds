import { useCallback, useEffect, useState } from 'react';
import { Erase, InfoCircle, Search } from 'iconoir-react';
import SearchAssociateSpec from '../../core/interfaces/specs/list/associate-list-by-id-or-name-spec';
import AssociateListByIdOrNameModal from '../../pages/saving-fund-management/associate/modals/associate-list-by-id-or-name-modal';
import { SFInputInfo } from '../form/interfaces/sf-input-info';

type SearchAssociateInputParams = SFInputInfo & {
  value: number;
  onChange: (id: number, name: string) => void;
}

const SearchAssociate = ({id, name, readonly, onChange}: SearchAssociateInputParams) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAssociate, setSelectedAssociate] = useState<SearchAssociateSpec>();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setShowModal(false);
    if (e.key === 'F6') setShowModal(true);
  }, []);

  const handleSelectedAssociate = (value: SearchAssociateSpec) => {
    setSelectedAssociate(value);

    if (onChange)
      onChange(value.id, value.name);
  };

  const handleEraseAssociate = () => {
    setSelectedAssociate({} as SearchAssociateSpec);
    if (onChange)
      onChange(0, '');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  return (
    <>
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="control">
        <input id={id} className="input" type="text" placeholder={name} style={{fontSize: '13px'}}
          value={`${selectedAssociate?.id ?? ''}|${selectedAssociate?.name ?? ''}`}
          readOnly={readonly} />
      </div>
    </div>
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button className="pagination-next" onClick={() => setShowModal(true)}><Search /></button>
      <ul className="pagination-list">
        <li>
          <button className="pagination-previous" onClick={handleEraseAssociate}><Erase /></button>
        </li>
      </ul>
    </nav>
    <AssociateListByIdOrNameModal
      show={showModal}
      onSelectedAssociate={(value) => handleSelectedAssociate(value)}
      onClose={() => setShowModal(false)} />
    </>
  )
};

export default SearchAssociate;