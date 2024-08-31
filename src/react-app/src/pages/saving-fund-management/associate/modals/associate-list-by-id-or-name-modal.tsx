import { useEffect, useState } from 'react';
import { objectToCamel } from 'ts-case-convert';
import SFTextInput from '../../../../components/form/sf-text-input';
import AppConstants from '../../../../core/constants/app-constants';
import CommandResponseInfo from '../../../../core/interfaces/info/command-response-info';
import useNotificationStore from '../../../../core/stores/notification-store';
import CheckAndAssign from '../../../../core/util/check-and-assign';
import AssociateListByIdOrNameSpec from '../../../../core/interfaces/specs/list/associate-list-by-id-or-name-spec';
import AssociateListByIdOrNameQuery from '../../../../core/interfaces/query/associate-list-by-id-or-name-query';

type AssociateListByIdOrNameModalParams = {
  show: boolean;
  onSelectedAssociate: (associate: AssociateListByIdOrNameSpec) => void;
  onClose: () => any;
};

export default function AssociateListByIdOrNameModal ({ show, onSelectedAssociate, onClose }: AssociateListByIdOrNameModalParams) {
  const { pushNotification } = useNotificationStore();
  const [showModal, setShowModal] = useState(show);
  const [associateInfo, setAssociateInfo] = useState('');
  const [associateList, setAssociateList] = useState<AssociateListByIdOrNameSpec[]>([]);

  const handleSearchAssociateEnter = async () => {
    try {
      const result = await fetch(`${AppConstants.apiAssociate}/search_by_id_or_name`, {
        method: 'POST',
        body: JSON.stringify({
          associate_id: CheckAndAssign.checkNumber(associateInfo),
          name: CheckAndAssign.checkText(associateInfo)
        } as AssociateListByIdOrNameQuery)
      });

      if (!result.ok)
        throw new Error('Ocurrió un error al realizar la consulta.');

      const response = await result.json() as CommandResponseInfo;
      const list = objectToCamel(response.data) as AssociateListByIdOrNameSpec[];

      setAssociateList(list);
    } catch (error: any) {
      pushNotification({ message: error.message, type: 'danger' });
    }
  };

  const handleAssociateSelected = (associate: AssociateListByIdOrNameSpec) => {
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
              {associateList.map((associate: AssociateListByIdOrNameSpec) => (
                <tr key={associate.id} style={{ cursor: 'pointer' }}
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

export type { AssociateListByIdOrNameModalParams };