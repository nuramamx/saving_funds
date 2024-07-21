import { useEffect, useState } from 'react';
import { objectToCamel } from 'ts-case-convert';
import { DownloadSquare, MoneySquare, NumberedListLeft, Tools } from 'iconoir-react';
import SearchAssociate from '../../../components/dynamic-elements/sf-search-associate';
import useValidationModalStore from '../../../core/stores/validation-modal-store';
import useNotificationStore from '../../../core/stores/notification-store';
import ListBorrowHistorySpec from '../../../core/interfaces/specs/list/list-borrow-history-spec';
import ToMoney from '../../../core/util/conversions/money-conversion';
import AppConstants from '../../../core/constants/app-constants';
import ListBorrowHistoryQuery from '../../../core/interfaces/query/list-borrow-history-query';
import CommandResponseInfo from '../../../core/interfaces/command-response-info';
import PaymentListModal from '../../../components/modals/payment-list-modal';
import PaymentListActionButton from '../../../components/action-buttons/payment-list-action-button';

export default function ListBorrowHistory() {
  const [showPaymentList, setShowPaymentList] = useState(false);
  const [associate, setAssociate] = useState<number>(0);
  const [borrows, setBorrows] = useState<ListBorrowHistorySpec[]>([]);
  const [selectedBorrow, setSelectedBorrow] = useState<number>(0);
  const { pushNotification } = useNotificationStore();
  const { setValidationModal } = useValidationModalStore();

  const handleListPaymentClick = (borrowId: number, show: boolean) => {
    setSelectedBorrow(borrowId);
    setShowPaymentList(show);
  }

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`${AppConstants.apiBorrow}/list/history`, {
        method: 'POST',
        body: JSON.stringify({
          associateId: associate
        } as ListBorrowHistoryQuery)
      });
      
      if (!response.ok)
        throw new Error('Ocurrió un error al realizar la consulta.');

      const commandResponse = await response.json() as CommandResponseInfo;
      const list = objectToCamel(JSON.parse(commandResponse.data)) as ListBorrowHistorySpec[];

      setBorrows(list);
    }

    if (associate > 0) {
      try {
        fetchHistory();
      } catch (err: any) {
        pushNotification({ message: err.message, type: 'danger' });
      }
    } else {
      setBorrows([]);
    }
  }, [associate, setAssociate]);

  return (
    <>
    <div className="columns">
      <div className="column"></div>
      <div className="column">
        <SearchAssociate
          id="borrow_associate_name"
          name="Socio"
          value={associate}
          readonly={true}
          onChange={(value) => setAssociate(value)} />
      </div>
      <div className="column"></div>
    </div>
    <div className="columns">&nbsp;</div>
    <div className="columns">
      <div className="column">
      <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Monto Solicitado</th>
              <th>Total a Pagar</th>
              <th>Total pagado</th>
              <th>Pagos a realizar</th>
              <th>Pagos realizados</th>
              <th>Periodo</th>
              <th>Periodicidad</th>
              <th>Dictamen</th>
              <th>Creado</th>
              <th>Inicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {borrows !== undefined && borrows?.length > 0 ? (
              borrows.map((borrow: ListBorrowHistorySpec) => (
              <tr key={borrow.id} className='animate__animated animate__fadeIn'>
                <td>{borrow.id}</td>
                <td>{ToMoney(borrow.requestedAmount)}</td>
                <td>{ToMoney(borrow.totalDue)}</td>
                <td>{ToMoney(borrow.totalPaid)}</td>
                <td>{borrow.numberPayments}</td>
                <td>{borrow.paymentsMade}</td>
                <td>{borrow.period} {borrow.period > 1 ? 'AÑOS' : 'AÑO'}</td>
                <td>{borrow.isFortnightly ? 'QUINCENAL' : 'MENSUAL'}</td>
                <td>{borrow.resolution}</td>
                <td>{borrow.createdAt}</td>
                <td>{borrow.startAt}</td>
                <td>
                  <button title="Descargar"><DownloadSquare /></button>&nbsp;&nbsp;
                  <button title="Realizar pago"><MoneySquare /></button>&nbsp;&nbsp;
                  {/* <button title="Ver pagos" onClick={() => handleListPaymentClick(borrow.id, true)}><NumberedListLeft /></button>&nbsp;&nbsp; */}
                  <PaymentListActionButton borrowId={borrow.id} />
                  <button title="Corregir"><Tools /></button>
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={10} style={{textAlign: 'center'}}>No hay pr&eacute;stamos disponibles para el socio</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <PaymentListModal borrowId={selectedBorrow} show={showPaymentList} onClose={() => handleListPaymentClick(0, false)} />
    </>
  );
}