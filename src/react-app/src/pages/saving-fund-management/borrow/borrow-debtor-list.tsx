import { useEffect, useState } from 'react'
import { objectToCamel } from 'ts-case-convert';
import AppConstants from '../../../core/constants/app-constants';
import CommandResponseInfo from '../../../core/interfaces/info/command-response-info';
import ToMoney from '../../../core/util/conversions/money-conversion';
import useNotificationStore from '../../../core/stores/notification-store';
import PaymentListActionButton from '../../../components/action-buttons/payment-list-action-button';
import PaymentCreateActionButton from '../../../components/action-buttons/payment-create-action-button';
import BorrowDebtorListSpec from '../../../core/interfaces/specs/list/borrow-debtor-list-spec';
import useAuthStore from '../../../core/stores/auth-store';
import SFPagination from '../../../components/dynamic-elements/sf-pagination';
import BorrowDebtorListQuery from '../../../core/interfaces/query/borrow-debtor-list-query';
import RefreshActionButton from '../../../components/action-buttons/refresh-action-button';

export default function BorrowDebtorList() {
  const [hasError, setHasError] = useState<Boolean>(false);
  const [borrows, setBorrows] = useState<BorrowDebtorListSpec[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { pushNotification } = useNotificationStore();
  const { token } = useAuthStore();

  const fetchBorrows = async (page: number) => {
    setLoading(true);

    try {
      const result = await fetch(`${AppConstants.apiBorrow}/list/debtor`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          page: page
        } as BorrowDebtorListQuery)
      });

      if (!result.ok) throw new Error('Ocurrió un error al realizar la petición.');

      const response = await result.json() as CommandResponseInfo;

      if (!response.successful) throw new Error(response.message);

      const list = objectToCamel(response.data) as BorrowDebtorListSpec[];
    
      setTotalPages(Math.ceil((response.totalRows ?? 0) / 20));
      setBorrows(list);
    } catch (err: any) {
      setHasError(true);
      pushNotification({ message: err.message, type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = async (currentPage: number) => {
    setPage(currentPage);
    await fetchBorrows(currentPage);
  };

  const handleReload = () => {
    if (!hasError) fetchBorrows(page);
  };

  useEffect(() => {
    handleReload();
  }, [hasError]);

  return (
    <>
    <div className='is-flex is-flex-direction-column' style={{ height: 'auto'}}>
      <div className="columns">
        <div className="column" data-tg-tour="Listado de socios morosos en el sistema.">
          <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Folio</th>
                <th>Socio Id</th>
                <th>Socio</th>
                <th>Monto Solicitado</th>
                <th>Total a Pagar</th>
                <th>Total pagado</th>
                <th>Total de Pagos</th>
                <th>Pagos Realizados</th>
                <th>Periodicidad</th>
                <th style={{width: '7vh'}}>Inicio</th>
                <th data-tg-tour="Acciones disponibles: Registrar pago y Listado de pagos.">Acciones</th>
              </tr>
            </thead>
            {!loading ? (
              <tbody>
                {borrows !== undefined && borrows?.length > 0 ? (
                  borrows.map((borrow: BorrowDebtorListSpec) => (
                    <tr key={borrow.id}>
                      <td>{borrow.id}</td>
                      <td>{borrow.fileNumber}</td>
                      <td>{borrow.associateId}</td>
                      <td>{borrow.associateName}</td>
                      <td>{ToMoney(borrow.requestedAmount)}</td>
                      <td>{ToMoney(borrow.totalDue)}</td>
                      <td>{ToMoney(borrow.totalPaid)}</td>
                      <td>{borrow.numberPayments}</td>
                      <td>{borrow.paymentsMade}</td>
                      <td>{borrow.isFortnightly ? 'QUINCENAL' : 'MENSUAL'}</td>
                      <td>{borrow.startAt}</td>
                      <td>
                        <PaymentCreateActionButton borrowId={borrow.id} onClose={() => handleReload()}/>
                        <PaymentListActionButton borrowId={borrow.id} associateName={`${borrow.associateId} ${borrow.associateName}`} onClose={handleReload} />
                      </td>
                    </tr>
                  ))) : (
                    <tr>
                      <td colSpan={12} style={{textAlign: 'center'}}>No hay ning&uacute;n prestamo atrasado.</td>
                    </tr>
                  )}
              </tbody>
            ) : <tbody><tr><td colSpan={12} style={{textAlign: 'center'}}>Cargando...</td></tr></tbody>}
          </table>
        </div>
      </div>
      <div className="bottom-content-container">
        <SFPagination currentPage={page} totalPages={totalPages} onChange={(v) => handlePagination(v)} />
      </div>
      <div className="bottom-content-container">
        <RefreshActionButton onClick={() => handlePagination(page)} />
      </div>
    </div>
    </>
  )
}