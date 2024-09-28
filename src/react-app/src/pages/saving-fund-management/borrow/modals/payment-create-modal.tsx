import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import SFModalInfo from "../../../../components/form/interfaces/sf-modal-info";
import useNotificationStore from "../../../../core/stores/notification-store";
import SFMoneyInput from "../../../../components/form/sf-money-input";
import SFNumberInput from "../../../../components/form/sf-number-input";
import usePaymentStore from "../../../../core/stores/payment-store";
import AppConstants from "../../../../core/constants/app-constants";
import CommandResponseInfo from "../../../../core/interfaces/info/command-response-info";

interface PaymentCreateModalParams extends SFModalInfo {
  borrowId: number;
};

export default function PaymentCreateModal({ borrowId, show, onClose }: PaymentCreateModalParams) {
  const {
    payment,
    setPayment,
    clearPayment
  } = usePaymentStore();
  const { pushNotification } = useNotificationStore();
  const [showModal, setShowModal] = useState(show);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${AppConstants.apiPayment}/create`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}` },
        body: JSON.stringify(payment)
      });

      if (!response.ok) {
        const error = await response.json() as CommandResponseInfo;
        setError(`${error.message}${error.data ? ' ' + error.data : ''}`);
        return;
      }
      
      handleClose();
      pushNotification({
        message: 'Pago registrado con éxito.',
        type: 'success'
      })
    } catch (err: any) {
      setError(err);
    }
    finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      clearPayment();
      setError('');
      onClose();
    }
  };

  useEffect(() => {
    setPayment({ ...payment, borrowId: borrowId });
    setShowModal(show);
  }, [show]);
  
  return (
    <div className={`modal ${showModal ? 'is-active' : ''} animate__animated animate__pulse`}>
    <div className="modal-background"></div>
    <div className="modal-card" style={{width: '30%'}}>
      <header className="modal-card-head">
        <p className="modal-card-title">Registrar Pago</p>
        <button className="delete" aria-label="close" onClick={handleClose}></button>
      </header>
      <section className="modal-card-body">
        <div className="columns">
          <div className="column is-1"></div>
          <div className="column">
            <SFNumberInput id={`${uuid()}_payment_number`} name="Número de pago"
              value={payment.number}
              onChange={(value) => setPayment({ ...payment, number: value })} />
            <SFMoneyInput id={`${uuid()}_payment_paid_amount`} name="Monto a registrar"
              value={payment.paidAmount}
              onChange={(value) => setPayment({ ...payment, paidAmount: value })} />
          </div>
          <div className="column is-1"></div>
        </div>
        <div className="columns">
          <div className="column is-1"></div>
          <div className="column" style={{ color: '#C0392B', textAlign: 'center' }}><label>{error}</label></div>
          <div className="column is-1"></div>
        </div>
      </section>
      <footer className="modal-card-foot" style={{ justifyContent: 'flex-end' }}>
        <div className="buttons">
          <button className="button is-success"
            onClick={handleClick}>
              {!loading ? 'Aceptar' : (<div className="loader"></div>)}
            </button>
        </div>
      </footer>
    </div>
  </div>
  )
}