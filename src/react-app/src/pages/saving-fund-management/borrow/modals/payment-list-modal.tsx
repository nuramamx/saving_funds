import { CheckCircle, Circle, WarningCircle, XmarkCircle } from 'iconoir-react';
import { useCallback, useEffect, useState } from 'react';
import { objectToCamel } from 'ts-case-convert';
import { Tooltip } from 'react-tooltip';
import { chunkArray } from '../../../../core/util/array-util';
import useNotificationStore from '../../../../core/stores/notification-store';
import AppConstants from '../../../../core/constants/app-constants';
import CommandResponseInfo from '../../../../core/interfaces/info/command-response-info';
import ToMoney from '../../../../core/util/conversions/money-conversion';
import SFPaymentMark from '../../../../components/dynamic-elements/sf-payment-mark';
import PaymentListByBorrowIdSpec from '../../../../core/interfaces/specs/list/payment-list-by-borrow-id-spec';
import useAuthStore from '../../../../core/stores/auth-store';
import usePaymentStore from '../../../../core/stores/payment-store';

type PaymentListModalParams = {
  borrowId: number;
  associateName: string;
  show: boolean;
  onClose: () => void;
};

export default function PaymentListModal({ borrowId, associateName, show, onClose}: PaymentListModalParams) {
  const { pushNotification } = useNotificationStore();
  const { token } = useAuthStore();
  const [showModal, setShowModal] = useState(show);
  const [payments, setPayments] = useState<PaymentListByBorrowIdSpec[]>([]);
  const [chunkedPayments, setChunkedPayments] = useState<PaymentListByBorrowIdSpec[][]>([]);
  const [error, setError] = useState('');
  const [refetching, setRefetching] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    if (onClose) {
      setPayments([]);
      setChunkedPayments([]);
      setError('');
      onClose();
    }
  };

  const fetchPayments = async () => {
    try {
      const result = await fetch(`${AppConstants.apiPayment}/list/${borrowId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!result.ok)
        throw new Error(result.statusText);

      const response = await result.json() as CommandResponseInfo;
      const list = objectToCamel(response.data) as PaymentListByBorrowIdSpec[];
      
      setPayments(list);
      setChunkedPayments(chunkArray(payments, 10));
    } catch (err: any) {
      console.log(err);
    }
  };

  const handlePayment = async (number: number, paidAmount: number) => {
    setError('');
    setLoading(true);

    try {
      const result = await fetch(`${AppConstants.apiPayment}/create`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          borrowId: borrowId,
          number: number,
          paidAmount: paidAmount
        })
      });

      if (!result.ok) {
        const error = await result.json() as CommandResponseInfo;
        setError(`${error.message}${error.data ? ' ' + error.data : ''}`);
        return;
      }

      setRefetching((p) => p + 1);
    } catch (err: any) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setShowModal(show);

    console.log('here 1...');
    if ((borrowId > 0 && chunkedPayments.length === 0) || refetching) {
      console.log('here 2...');
      fetchPayments();
    }
  }, [show, borrowId, refetching, chunkedPayments]);

  return (
  <div className={`modal ${showModal ? 'is-active' : ''} animate__animated animate__pulse`}>
    <div className="modal-background"></div>
    <div className="modal-card" style={{width: '60%'}}>
      <header className="modal-card-head">
        <p className="modal-card-title">
          Listado de Pagos<br />
          <label style={{ fontSize: '12px'}}>{associateName}</label>
        </p>
        <button className="delete" aria-label="close" onClick={handleClose}></button>
      </header>
      <section className="modal-card-body" style={{fontSize: '12px'}}>
        {chunkedPayments.map((chunk, index) => (
          <div className="card" key={`card-${index}`}>
            <footer className="card-footer">
              {chunk.map((item) => (
                <button data-tooltip-id={`item-${item.number}-${index}`} className="card-footer-item" key={`item-${item.number}-${index}`}
                  style={{cursor: item.status !== 'PAGADO' && item.status !== 'INCIDENCIA' ? 'pointer' : 'default'}}
                  onClick={() => item.status !== 'PAGADO' && item.status !== 'INCIDENCIA' ? handlePayment(item.number, item.paymentAmount) : () => {}}>
                  {!loading ? (
                    <>
                    <SFPaymentMark type={item.status} />&nbsp;&nbsp;&nbsp;
                    </>
                  ) : (
                    <>
                    <span className="loader" style={{ display: 'inline-block'}}></span>&nbsp;&nbsp;&nbsp;
                    </>
                  )}
                  {item.number}
                  <Tooltip border={'1px solid #85929E'} opacity={100} style={{
                    backgroundColor: "white",
                    color: "#222",
                    justifyContent: 'left',
                    fontSize: '14px',
                    zIndex: '999999999' }}
                    id={`item-${item.number}-${index}`}>
                    {(item.status !== 'PAGADO' && item.status !== 'INCIDENCIA') && (<><strong style={{color: '#C0392B'}}>Al dar click se marcar&aacute; como pagado</strong><br /><br /></>)}
                    <strong>Pagar en</strong>: {item.date}<br /><br />
                    <strong>A pagar</strong>: {ToMoney(item.paymentAmount)}<br />
                    <strong>Pagado</strong>: {ToMoney(item.paidAmount)}<br />
                    <strong>Balance</strong>: {ToMoney(item.balance)}<br /><br />
                    <strong>Aplicado el</strong>: {item.appliedAt ?? '-'}<br />
                    <strong>Status</strong>: {item.status ?? '-'}<br />
                    <strong>Dictamen</strong>: {item.resolution ?? '-'}<br />
                  </Tooltip>
                </button>
              ))}
              {chunk.length < 10 &&
                Array.from({ length: 10 - chunk.length }).map((_, idx) => (
                  <button className="card-footer-item" key={`empty-${index}-${idx}`}></button>
                ))}
            </footer>
          </div>
        ))}
        <div className="columns">
          <div className="column">
            <div className="block" style={{display:'flex'}}>
              <CheckCircle style={{color:'#27AE60'}} />&nbsp;Pagado
            </div>
          </div>
          <div className="column">
            <div className="block" style={{display:'flex'}}>
              <XmarkCircle style={{color:'#C0392B'}} />&nbsp;Atrasado
            </div>
          </div>
          <div className="column">
            <div className="block" style={{display:'flex'}}>
              <WarningCircle style={{color:'#F1C40F'}} />&nbsp;Con incidencia
            </div>
          </div>
          <div className="column">
            <div className="block" style={{display:'flex'}}>
              <Circle />&nbsp;Pendiente
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-1"></div>
          <div className="column" style={{ color: '#C0392B', textAlign: 'center' }}><label>{error}</label></div>
          <div className="column is-1"></div>
        </div>
      </section>
      <footer className="modal-card-foot">
      </footer>
    </div>
  </div>
  )
};