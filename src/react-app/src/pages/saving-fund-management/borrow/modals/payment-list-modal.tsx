import { CheckCircle, Circle, WarningCircle, XmarkCircle } from 'iconoir-react';
import { useEffect, useState } from 'react';
import { objectToCamel } from 'ts-case-convert';
import { Tooltip } from 'react-tooltip';
import { chunkArray } from '../../../../core/util/array-util';
import useNotificationStore from '../../../../core/stores/notification-store';
import AppConstants from '../../../../core/constants/app-constants';
import CommandResponseInfo from '../../../../core/interfaces/info/command-response-info';
import ToMoney from '../../../../core/util/conversions/money-conversion';
import SFPaymentMark from '../../../../components/dynamic-elements/sf-payment-mark';
import PaymentListByBorrowIdSpec from '../../../../core/interfaces/specs/list/payment-list-by-borrow-id-spec';

type PaymentListModalParams = {
  borrowId: number;
  show: boolean;
  onClose: () => void;
};

export default function PaymentListModal({ borrowId, show, onClose}: PaymentListModalParams) {
  const { pushNotification } = useNotificationStore();
  const [showModal, setShowModal] = useState(show);
  const [payments, setPayments] = useState<PaymentListByBorrowIdSpec[]>([]);
  const [chunkedPayments, setChunkedPayments] = useState<PaymentListByBorrowIdSpec[][]>([]);

  const handleClose = () => {
    if (onClose) {
      setPayments([]);
      setChunkedPayments([]);
      onClose();
    }
  };

  const fetchPayments = async () => {
    try {
      const result = await fetch(`${AppConstants.apiPayment}/list/${borrowId}`, {
        method: 'GET'
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

  useEffect(() => {
    setShowModal(show);

    if (borrowId > 0 && chunkedPayments.length === 0) fetchPayments();
  }, [show, borrowId, chunkedPayments]);

  return (
  <div className={`modal ${showModal ? 'is-active' : ''} animate__animated animate__pulse`}>
    <div className="modal-background"></div>
    <div className="modal-card" style={{width: '60%'}}>
      <header className="modal-card-head">
        <p className="modal-card-title">Listado de Pagos</p>
        <button className="delete" aria-label="close" onClick={handleClose}></button>
      </header>
      <section className="modal-card-body" style={{fontSize: '12px'}}>
        {chunkedPayments.map((chunk, index) => (
          <div className="card" key={`card-${index}`}>
            <footer className="card-footer">
              {chunk.map((item) => (
                <button data-tooltip-id={`item-${item.number}-${index}`} className="card-footer-item" key={`item-${item.number}-${index}`}>
                  <SFPaymentMark type={item.status} />&nbsp;&nbsp;&nbsp;
                  {item.number}
                  <Tooltip border={'1px solid #85929E'} opacity={100} style={{
                    backgroundColor: "white",
                    color: "#222",
                    justifyContent: 'left',
                    fontSize: '14px',
                    zIndex: '999999999' }}
                    id={`item-${item.number}-${index}`}>
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
      </section>
      <footer className="modal-card-foot">
      </footer>
    </div>
  </div>
  )
};