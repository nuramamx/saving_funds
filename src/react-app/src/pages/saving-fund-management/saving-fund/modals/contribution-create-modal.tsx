import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { addDays } from "date-fns";
import SFModalInfo from "../../../../components/form/interfaces/sf-modal-info";
import useNotificationStore from "../../../../core/stores/notification-store";
import SFMoneyInput from "../../../../components/form/sf-money-input";
import AppConstants from "../../../../core/constants/app-constants";
import CommandResponseInfo from "../../../../core/interfaces/info/command-response-info";
import ContributionCreateCommand from "../../../../core/interfaces/commands/contribution-create-command";
import SFDatePickerInput from "../../../../components/form/sf-datepicker-input";
import useAuthStore from "../../../../core/stores/auth-store";

interface ContributionCreateModalParams extends SFModalInfo {
  savingFundId: number;
};

export default function ContributionCreateModal({ savingFundId, show, onClose }: ContributionCreateModalParams) {
  const initialState = {
    savingFundId: undefined!,
    appliedAt: undefined!,
    amount: 0
  };
  const [contribution, setContribution] = useState<ContributionCreateCommand>(initialState);
  const { pushNotification } = useNotificationStore();
  const { token } = useAuthStore();
  const [showModal, setShowModal] = useState(show);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${AppConstants.apiContribution}/create`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(contribution)
      });

      if (!response.ok) {
        const error = await response.json() as CommandResponseInfo;
        setError(`${error.message}${error.data ? ' ' + error.data : ''}`);
        return;
      }
      
      handleClose();
      pushNotification({
        message: 'Aportación registrada con éxito.',
        type: 'success'
      });
    } catch (err: any) {
      setError(err);
    }
    finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      setContribution(initialState);
      setError('');
      onClose();
    }
  };

  useEffect(() => {
    setContribution({...contribution, savingFundId: savingFundId });
    setShowModal(show);
  }, [show]);
  
  return (
    <div className={`modal ${showModal ? 'is-active' : ''} animate__animated animate__pulse`}>
    <div className="modal-background"></div>
    <div className="modal-card" style={{width: '30%', height: '58%'}}>
      <header className="modal-card-head">
        <p className="modal-card-title">Registrar Aportaci&oacute;n</p>
        <button className="delete" aria-label="close" onClick={handleClose}></button>
      </header>
      <section className="modal-card-body">
        <div className="columns">
          <div className="column is-1"></div>
          <div className="column">
            <SFDatePickerInput params={{
              id: 'contribution_applied_date',
              name: 'Fecha de Aplicación',
              value: contribution.appliedAt,
              onChange: (value) => setContribution({ ...contribution, appliedAt: value }),
              minDate: addDays(new Date(), -90),
              maxDate: addDays(new Date(), 90),

            }} />
            <SFMoneyInput id={`${uuid()}_contribution_amount`} name="Monto de aportación"
              value={contribution.amount}
              onChange={(value) => setContribution({ ...contribution, amount: value })} />
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