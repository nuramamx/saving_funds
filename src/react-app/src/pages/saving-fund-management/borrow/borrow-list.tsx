import { useEffect, useState } from 'react';
import { objectToCamel } from 'ts-case-convert';
import SearchAssociate from '../../../components/dynamic-elements/sf-search-associate';
import useNotificationStore from '../../../core/stores/notification-store';
import ToMoney from '../../../core/util/conversions/money-conversion';
import AppConstants from '../../../core/constants/app-constants';
import CommandResponseInfo from '../../../core/interfaces/info/command-response-info';
import PaymentListActionButton from '../../../components/action-buttons/payment-list-action-button';
import PaymentCreateActionButton from '../../../components/action-buttons/payment-create-action-button';
import BorrowAuthorizationReportActionItem from './action-items/borrow-authorization-report-action-item';
import useAuthStore from '../../../core/stores/auth-store';
import BorrowListSpec from '../../../core/interfaces/specs/list/borrow-list-spec';
import BorrowListQuery from '../../../core/interfaces/query/borrow-list-query';
import RefreshActionButton from '../../../components/action-buttons/refresh-action-button';

export default function BorrowList() {
  const [showPaymentList, setShowPaymentList] = useState(false);
  const [associate, setAssociate] = useState<number>(0);
  const [associateName, setAssociateName] = useState<string>('');
  const [borrows, setBorrows] = useState<BorrowListSpec[]>([]);
  const [selectedBorrow, setSelectedBorrow] = useState<number>(0);
  const { pushNotification } = useNotificationStore();
  const { token } = useAuthStore();

  const handleListPaymentClick = (borrowId: number, show: boolean) => {
    setSelectedBorrow(borrowId);
    setShowPaymentList(show);
  }

  const fetchHistory = async () => {
    const response = await fetch(`${AppConstants.apiBorrow}/list`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        associateId: associate
      } as BorrowListQuery)
    });
    
    if (!response.ok)
      throw new Error('Ocurrió un error al realizar la consulta.');

    const commandResponse = await response.json() as CommandResponseInfo;
    const list = objectToCamel(commandResponse.data) as BorrowListSpec[];

    setBorrows(list);
  }

  const handleAssociateChange = (id: number, name: string) => {
    setAssociate(id);
    setAssociateName(name);
  }

  const handleReload = () => {
    if (associate > 0) {
      try {
        fetchHistory();
      } catch (err: any) {
        pushNotification({ message: err.message, type: 'danger' });
      }
    } else setBorrows([]);
  };

  useEffect(() => {
    handleReload();
  }, [associate]);

  return (
    <>
    <div className='is-flex is-flex-direction-column' style={{ height: 'auto' }}>
      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <SearchAssociate
            id="borrow_associate_name"
            name="Socio"
            value={associate}
            readonly={true}
            onChange={(id, name) => handleAssociateChange(id, name)} />
        </div>
        <div className="column"></div>
      </div>
      <div className="columns">
        <div className="column" data-tg-tour="Listado de todos los préstamos generados en el sistema.">
        <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Folio</th>
                <th data-tg-tour="Monto solicitado por el socio.">Monto Solicitado</th>
                <th data-tg-tour="Pago frecuente requerido.">Pago</th>
                <th data-tg-tour="Es el total a pagar calculado por el sistema.">Total a Pagar</th>
                <th data-tg-tour="Son los pagos que ha realizado el socio.">Total pagado</th>
                <th data-tg-tour="Número de pagos totales a realizar calculados por el sistema."># Pagos</th>
                <th data-tg-tour="Número de pagos realizados por el socio.">Realizados</th>
                <th data-tg-tour="Periodo en años en que fue registrado el préstamo.">Periodo</th>
                <th data-tg-tour="Periodicidad quincenal o mensual.">Periodicidad</th>
                <th data-tg-tour="Dictamen del sistema en cuanto a estatus del préstamo.">Dictamen</th>
                <th data-tg-tour="Fecha en que el préstamo empezará a ser válido.">Inicio</th>
                <th data-tg-tour="Fecha de creación del préstamo.">Creado</th>
                <th data-tg-tour="Acciones disponibles: Reporte de autorización del préstamo, Registrar pago y Listado de pagos realizados.">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {borrows !== undefined && borrows?.length > 0 ? (
                borrows.map((borrow: BorrowListSpec) => (
                <tr key={borrow.id}>
                  <td>{borrow.id}</td>
                  <td>{borrow.fileNumber}</td>
                  <td>{ToMoney(borrow.requestedAmount)}</td>
                  <td>{ToMoney(borrow.totalDue / borrow.numberPayments)}</td>
                  <td>{ToMoney(borrow.totalDue)}</td>
                  <td>{ToMoney(borrow.totalPaid)}</td>
                  <td>{borrow.numberPayments}</td>
                  <td>{borrow.paymentsMade}</td>
                  <td>{borrow.period} {borrow.period > 1 ? 'AÑOS' : 'AÑO'}</td>
                  <td>{borrow.isFortnightly ? 'QUINCENAL' : 'MENSUAL'}</td>
                  <td>{borrow.resolution}</td>
                  <td>{borrow.startAt}</td>
                  <td>{borrow.createdAt}</td>
                  <td>
                    <BorrowAuthorizationReportActionItem associateName={associateName.toUpperCase()} borrowId={borrow.id} />
                    <PaymentCreateActionButton borrowId={borrow.id} onClose={handleReload} />
                    <PaymentListActionButton borrowId={borrow.id} associateName={`${associate} - ${associateName}`} onClose={handleReload} />
                  </td>
                </tr>
              ))) : (
                <tr>
                  <td colSpan={13} style={{textAlign: 'center'}}>No hay pr&eacute;stamos disponibles para el socio seleccionado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bottom-content-container">
        <RefreshActionButton onClick={() => handleReload()} />
      </div>
    </div>
    </>
  );
}