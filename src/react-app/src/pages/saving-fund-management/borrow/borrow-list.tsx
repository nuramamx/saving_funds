import { useEffect, useState } from 'react'
import { objectToCamel } from 'ts-case-convert';
import { DownloadSquare } from 'iconoir-react';
import AppConstants from '../../../core/constants/app-constants';
import CommandResponseInfo from '../../../core/interfaces/info/command-response-info';
import ToMoney from '../../../core/util/conversions/money-conversion';
import useNotificationStore from '../../../core/stores/notification-store';
import PaymentListActionButton from '../../../components/action-buttons/payment-list-action-button';
import PaymentCreateActionButton from '../../../components/action-buttons/payment-create-action-button';
import BorrowListSpec from '../../../core/interfaces/specs/list/borrow-list-spec';

export default function BorrowList() {
  const [hasError, setHasError] = useState<Boolean>(false);
  const [borrows, setBorrows] = useState<BorrowListSpec[]>([]);
  const { pushNotification } = useNotificationStore();

  const fetchBorrows = async () => {
    try {
      const result = await fetch(`${AppConstants.apiBorrow}/list`, {
        method: 'GET'
      });

      if (!result.ok) throw new Error('Ocurrió un error al realizar la petición.');

      const response = await result.json() as CommandResponseInfo;

      if (!response.successful) throw new Error(response.message);

      const list = objectToCamel(response.data) as BorrowListSpec[];
    
      setBorrows(list);
    } catch (err: any) {
      setHasError(true);
      pushNotification({ message: err.message, type: 'danger' });
    }
  };

  const handleReload = () => {
    if (!hasError) fetchBorrows();
  };

  useEffect(() => {
    handleReload();
  }, [hasError]);

  return (
    <div className="columns">
      <div className="column">
        <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Socio</th>
              <th>Monto Solicitado</th>
              <th>Total a Pagar</th>
              <th>Total pagado</th>
              <th>Periodo</th>
              <th>Periodicidad</th>
              <th>Creado</th>
              <th>Inicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {borrows !== undefined && borrows?.length > 0 ? (
              borrows.map((borrow: BorrowListSpec) => (
              <tr key={borrow.id}>
                <td>{borrow.id}</td>
                <td>{borrow.associateName}</td>
                <td>{ToMoney(borrow.requestedAmount)}</td>
                <td>{ToMoney(borrow.totalDue)}</td>
                <td>{ToMoney(borrow.totalPaid)}</td>
                <td>{borrow.period} {borrow.period > 1 ? 'AÑOS' : 'AÑO'}</td>
                <td>{borrow.isFortnightly ? 'QUINCENAL' : 'MENSUAL'}</td>
                <td>{borrow.createdAt}</td>
                <td>{borrow.startAt}</td>
                <td>
                  <button title="Descargar"><DownloadSquare /></button>&nbsp;&nbsp;
                  <PaymentCreateActionButton borrowId={borrow.id} onClose={handleReload}/>
                  <PaymentListActionButton borrowId={borrow.id} />
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={8} style={{textAlign: 'center'}}>No hay pr&eacute;stamos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}