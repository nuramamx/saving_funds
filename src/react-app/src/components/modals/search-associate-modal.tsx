import { useEffect, useState } from 'react';
import SFTextInput from '../form/sf-text-input';
import AppConstants from '../../core/constants/app-constants';
import CommandResponseInfo from '../../core/interfaces/command-response-info';
import useNotificationStore from '../../core/stores/notification-store';
import SearchAssociateByIdOrNameQuery from '../../core/interfaces/queries/search-associate-by-id-or-name-query';
import CheckAndAssign from '../../core/util/check-and-assign';
import SearchAssociateInfo from '../../core/interfaces/procedures/search-associate-procedure-info';

type searchAssociateModalParams = {
  show: boolean;
  onSelectedAssociate: (associate: SearchAssociateInfo) => void;
  onClose: () => any;
};

const SearchAssociateModal = ({ show, onSelectedAssociate, onClose }: searchAssociateModalParams) => {
  const { pushNotification } = useNotificationStore();
  const [showModal, setShowModal] = useState(show);
  const [associateInfo, setAssociateInfo] = useState('');
  const [associateList, setAssociateList] = useState<SearchAssociateInfo[]>([]);

  const handleSearchAssociateEnter = async () => {
    try {
      const data = JSON.stringify({
        associate_id: CheckAndAssign.checkNumber(associateInfo),
        name: CheckAndAssign.checkText(associateInfo)
      } as SearchAssociateByIdOrNameQuery);

      const response = await fetch(`${AppConstants.apiAssociate}/search_by_id_or_name`, {
        method: 'POST',
        body: data
      });
      if (!response.ok)
        throw new Error('Ocurrió un error al realizar la consulta.');

      const commandResponse = await response.json() as CommandResponseInfo;

      setAssociateList(commandResponse.data);
    } catch (error: any) {
      pushNotification({ message: error.message, type: 'danger' });
    }
  };

  const handleAssociateSelected = (associate: SearchAssociateInfo) => {
    if (onSelectedAssociate) {
      onSelectedAssociate(associate);
      onClose();
    }
  };

  useEffect(() => {
    setShowModal(show);
  }, [show, associateInfo, onSelectedAssociate]);

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
              {associateList.map((associate: SearchAssociateInfo) => (
                <tr style={{ cursor: 'pointer' }} key={associate.id} onClick={() => handleAssociateSelected(associate)}>
                  <td>{associate.id}</td>
                  <td>{associate.fullname}</td>
                  <td>{associate.address}</td>
                  <td>{associate.agreement_name}</td>
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