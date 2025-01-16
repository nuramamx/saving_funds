import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import SFModalInfo from "../../../../components/form/interfaces/sf-modal-info";
import useNotificationStore from "../../../../core/stores/notification-store";
import SFMoneyInput from "../../../../components/form/sf-money-input";
import AppConstants from "../../../../core/constants/app-constants";
import CommandResponseInfo from "../../../../core/interfaces/info/command-response-info";
import WithdrawalCreateCommand from "../../../../core/interfaces/commands/withdrawal-create-command";
import useAuthStore from "../../../../core/stores/auth-store";
import SFDatePickerInput from "../../../../components/form/sf-datepicker-input";
import { addDays } from "date-fns";

interface WithdrawalCreateModalParams extends SFModalInfo {
  savingFundId: number;
};

export default function WithdrawalCreateModal({ savingFundId, show, onClose }: WithdrawalCreateModalParams) {
  const initialState = {
    savingFundId: undefined!,
    amount: 0,
    isYields: false,
    appliedAt: undefined!
  };
  const [withdrawal, setWithdrawal] = useState<WithdrawalCreateCommand>(initialState);
  const { pushNotification } = useNotificationStore();
  const { token } = useAuthStore();
  const [showModal, setShowModal] = useState(show);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${AppConstants.apiWithdrawal}/create`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(withdrawal)
      });

      if (!response.ok) {
        const error = await response.json() as CommandResponseInfo;
        setError(`${error.message}${error.data ? ' ' + error.data : ''}`);
        return;
      }
      
      handleClose();
      pushNotification({
        message: 'Retiro registrado con éxito.',
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
      setWithdrawal(initialState);
      setError('');
      onClose();
    }
  };

  useEffect(() => {
    setWithdrawal({ ...withdrawal, savingFundId: savingFundId });
    setShowModal(show);
  }, [show]);
  
  return (
    <div className={`modal ${showModal ? 'is-active' : ''} animate__animated animate__pulse`}>
    <div className="modal-background"></div>
    <div className="modal-card"  style={{width: '30%', height: '75%'}}>
      <header className="modal-card-head">
        <p className="modal-card-title">Registrar Retiro</p>
        <button className="delete" aria-label="close" onClick={handleClose}></button>
      </header>
      <section className="modal-card-body">
        <div className="columns">
          <div className="column is-1"></div>
          <div className="column">
          <SFDatePickerInput params={{
              id: 'withdrawal_applied_date',
              name: 'Fecha de Aplicación',
              value: withdrawal.appliedAt,
              onChange: (value) => setWithdrawal({ ...withdrawal, appliedAt: value }),
              minDate: new Date(2008, 0),
              maxDate: addDays(new Date(), 0),
              showYear: true
            }} />
            <SFMoneyInput id={`${uuid()}_withdrawal_amount`} name="Monto de retiro"
              value={withdrawal.amount}
              onChange={(value) => setWithdrawal({ ...withdrawal, amount: value })} />
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