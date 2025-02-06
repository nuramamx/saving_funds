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
import { objectToCamel } from "ts-case-convert";
import StatementReportDataSpec from "../../../../core/interfaces/specs/base/statement-report-data-spec";
import ToMoney from "../../../../core/util/conversions/money-conversion";

interface WithdrawalCreateModalParams extends SFModalInfo {
  associateId: number;
  savingFundId: number;
};

export default function WithdrawalCreateModal({ associateId, savingFundId, show, onClose }: WithdrawalCreateModalParams) {
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
  const [loadingStatementData, setLoadingloadingStatementData] = useState(false);
  const [error, setError] = useState('');
  const [statement, setSatement] = useState<StatementReportDataSpec>();

  const fetchStatementReportData = async () => {
    setLoadingloadingStatementData(true);

    try {
    const result = await fetch(`${AppConstants.apiReport}/statement/data/${associateId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!result.ok)
      pushNotification({ message: result.statusText, type: 'danger' });

    const response = await result.json() as CommandResponseInfo;
    const responseData = objectToCamel(response.data) as StatementReportDataSpec[];
    
    if (response.successful) return setSatement(responseData[0]);
    else throw new Error(response.message);
    } catch (err: any) {

    } finally {
      setLoadingloadingStatementData(false);
    }
  };

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
    fetchStatementReportData();
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
        <div className="column">
          <div className="column" style={{ fontSize: '13px'}}>
            <table className="table">
              <tbody>
                <tr>
                  <td colSpan={2}>{loadingStatementData && (<><span className="loader" style={{ display: 'inline-block'}}></span>&nbsp;Cargando la informaci&oacute;n requerida...</>)}</td>
                </tr>
                <tr style={{ clipPath: 'xywh(0 0 100% 100% round 0.5em)' }}>
                  <td><strong>Cantidad a retener</strong></td>
                  <td>{ToMoney(statement?.amountToWithhold ?? 0)}</td>
                </tr>
                <tr style={{ background: '#d1f2eb', clipPath: 'xywh(0 0 100% 100% round 0.5em)' }}>
                  <td><strong>Cantidad recomendada para retirar</strong></td>
                  <td><strong>{ToMoney(statement?.amountAvailableToWithdrawalRounded ?? 0)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
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