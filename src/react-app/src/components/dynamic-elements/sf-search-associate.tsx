import { useCallback, useEffect, useState } from 'react';
import { Erase, Refresh, Search } from 'iconoir-react';
import AssociateListByIdOrNameSpec from '../../core/interfaces/specs/list/associate-list-by-id-or-name-spec';
import AssociateListByIdOrNameModal from '../../pages/saving-fund-management/associate/modals/associate-list-by-id-or-name-modal';
import { SFInputInfo } from '../form/interfaces/sf-input-info';
import React from 'react';

type SearchAssociateInputParams = SFInputInfo & {
  value: number;
  onChange: (id: number, name: string, data: AssociateListByIdOrNameSpec) => void;
}

type SearchAssociateForwardedMethods = {
  clear: () => void
}

const SearchAssociateInternal = ({id, name, readonly, onChange}: SearchAssociateInputParams, ref: React.Ref<SearchAssociateForwardedMethods> | undefined) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAssociate, setSelectedAssociate] = useState<AssociateListByIdOrNameSpec>();

  React.useImperativeHandle(ref, () => ({
    clear() {
      handleEraseAssociate();
    }
  }));

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setShowModal(false);
    if (e.key === 'F6') setShowModal(true);
  }, []);

  const handleSelectedAssociate = (value: AssociateListByIdOrNameSpec) => {
    setSelectedAssociate(value);

    if (onChange)
      onChange(value.id, value.name, value);
  };

  const handleEraseAssociate = () => {
    setSelectedAssociate({} as AssociateListByIdOrNameSpec);
    if (onChange)
      onChange(0, '', {} as AssociateListByIdOrNameSpec);
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

const SearchAssociate = React.forwardRef(SearchAssociateInternal);

export type { SearchAssociateForwardedMethods }
export default SearchAssociate;