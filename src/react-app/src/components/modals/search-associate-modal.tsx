import { useEffect, useState } from 'react';
import { objectToCamel } from 'ts-case-convert';
import SFTextInput from '../form/sf-text-input';
import AppConstants from '../../core/constants/app-constants';
import CommandResponseInfo from '../../core/interfaces/command-response-info';
import useNotificationStore from '../../core/stores/notification-store';
import SearchAssociateByIdOrNameQuery from '../../core/interfaces/query/search-associate-by-id-or-name-param';
import CheckAndAssign from '../../core/util/check-and-assign';
import SearchAssociateSpec from '../../core/interfaces/specs/search/search-associate-spec';

type SearchAssociateModalParams = {
  show: boolean;
  onSelectedAssociate: (associate: SearchAssociateSpec) => void;
  onClose: () => any;
};

const SearchAssociateModal = ({ show, onSelectedAssociate, onClose }: SearchAssociateModalParams) => {
  const { pushNotification } = useNotificationStore();
  const [showModal, setShowModal] = useState(show);
  const [associateInfo, setAssociateInfo] = useState('');
  const [associateList, setAssociateList] = useState<SearchAssociateSpec[]>([]);

  const handleSearchAssociateEnter = async () => {
    try {
      const result = await fetch(`${AppConstants.apiAssociate}/search_by_id_or_name`, {
        method: 'POST',
        body: JSON.stringify({
          associate_id: CheckAndAssign.checkNumber(associateInfo),
          name: CheckAndAssign.checkText(associateInfo)
        } as SearchAssociateByIdOrNameQuery)
      });

      if (!result.ok)
        throw new Error('Ocurrió un error al realizar la consulta.');

      const response = await result.json() as CommandResponseInfo;
      const list = objectToCamel(response.data) as SearchAssociateSpec[];

      setAssociateList(list);
    } catch (error: any) {
      pushNotification({ message: error.message, type: 'danger' });
    }
  };

  const handleAssociateSelected = (associate: SearchAssociateSpec) => {
    if (onSelectedAssociate) {
      onSelectedAssociate(associate);
      onClose();
    }
  };

  useEffect(() => {
    if (!show) {
      setAssociateInfo('');
      setAssociateList([]);
    }
    setShowModal(show);
  }, [show, associateInfo, onSelectedAssociate]);

  return (
    <div className={`modal ${showModal ? 'is-active' : ''} animate__animated animate__pulse`}>
      <div className="modal-background"></div>
      <div className="modal-card" style={{width: '60%'}}>
        <header className="modal-card-head">
          <p className="modal-card-title">B&uacute;squeda de Socio</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <SFTextInput id="search-associate-name" name="Nombre del Asociado"
            value={associateInfo}
            onEnter={handleSearchAssociateEnter}
            onChange={(value) => setAssociateInfo(value)} />
          <table className="table is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Direcci&oacute;n</th>
                <th>Convenio</th>
              </tr>
            </thead>
            <tbody>
              {associateList.map((associate: SearchAssociateSpec) => (
                <tr key={associate.id} className='animate__animated animate__fadeIn' style={{ cursor: 'pointer' }}
                  onClick={() => handleAssociateSelected(associate)}>
                  <td>{associate.id}</td>
                  <td>{associate.fullname}</td>
                  <td>{associate.address}</td>
                  <td>{associate.agreementName}</td>
                </tr>
              ))}
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