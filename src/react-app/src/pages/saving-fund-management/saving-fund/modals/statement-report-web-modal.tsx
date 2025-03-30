import { useEffect, useState } from "react";
import { objectToCamel } from "ts-case-convert";
import { v4 as uuid } from "uuid";
import useAuthStore from "../../../../core/stores/auth-store";
import useIsMobile from "../../../../core/hooks/use-is-mobile";
import AppConstants from "../../../../core/constants/app-constants";
import CommandResponseInfo from "../../../../core/interfaces/info/command-response-info";
import StatementReportDataSpec from "../../../../core/interfaces/specs/base/statement-report-data-spec";
import StatementReportListSpec from "../../../../core/interfaces/specs/list/statement-report-list-spec";
import useNotificationStore from "../../../../core/stores/notification-store";
import ToMoney from "../../../../core/util/conversions/money-conversion";

type StatementReportWebModalProps = {
  associateId: number;
  associateName: string;
  show: boolean;
  onClose: () => void;
}

const StatementReportWebModal: React.FC<StatementReportWebModalProps> = ({ associateId, associateName, show, onClose }) => {
  const { user, token } = useAuthStore();
  const { pushNotification } = useNotificationStore();
  const [year, setYear] = useState(new Date().getFullYear());
  const [showModal, setShowModal] = useState(show);
  const [loading, setLoading] = useState<boolean>(false);
  const [statementData, setStatementData] = useState<StatementReportDataSpec[]>([]);
  const [statementList, setStatementList] = useState<StatementReportListSpec[]>([]);
  const isMobile = useIsMobile();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const fetchStatementReportData = async () => {
    const result = await fetch(`${AppConstants.apiReport}/statement/data/${associateId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!result.ok)
      pushNotification({ message: result.statusText, type: 'danger' });

    const response = await result.json() as CommandResponseInfo;
    const responseData = objectToCamel(response.data) as StatementReportDataSpec[];
    
    if (response.successful) return responseData;
    else throw new Error(response.message);
  };

  const fetchStatementReportList = async () => {
    const result = await fetch(`${AppConstants.apiReport}/statement/list/${associateId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!result.ok)
      pushNotification({ message: result.statusText, type: 'danger' });

    const response = await result.json() as CommandResponseInfo;
    const responseData = objectToCamel(response.data) as StatementReportListSpec[];

    if (response.successful) return responseData;
    else throw new Error(response.message);
  };

  const fetchData = async () => {
    setLoading(true);
    Promise.all([fetchStatementReportData, fetchStatementReportList])
      .then(async ([data, list]) => {
        const statementData = await data();
        const statementList = await list();

        if (statementData && statementList && statementList.length > 0) {
          setStatementData(statementData);
          setStatementList(statementList);
        }
      })
      .catch (err => {
        pushNotification({ message: 'No se pudo generar el estado de cuenta en PDF.', type: 'danger' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setShowModal(show);

    if (associateId && show) fetchData();
  }, [show]);

  return (
    <div className={`modal ${showModal ? 'is-active' : ''} animate__animated animate__pulse`} style={{ textAlign: 'left' }}>
      <div className="modal-background"></div>
      <div className="modal-card" style={{width: isMobile ? '80%' : '60%'}}>
        <header className="modal-card-head">
          <p className="modal-card-title">
            Estado de cuenta<br />
            <label style={{ fontSize: '12px'}}>{associateName}</label><br />
          </p>
          <button className="delete" aria-label="close" onClick={handleClose} style={{ marginTop: isMobile ? '-25px' : 'auto' }}></button>
        </header>
        <section className="modal-card-body" style={{fontSize: '12px'}}>
          {loading ? <progress className="progress is-small is-primary" max="100">15%</progress> : (
            <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
            <thead>
              <tr key={1}>
                <th>A&ntilde;o</th>
                <th>Saldo inicial</th>
                <th>Total Aportaciones</th>
                <th>Tasa %</th>
                <th>Rendimientos</th>
                <th>Retiros</th>
                <th>Total neto</th>
              </tr>
            </thead>
            <tbody>
              {statementList.map((item, index) => (
                <tr key={`${uuid()}`}>
                  <td>{item.year}</td>
                  <td>{ToMoney(item.initialBalance)}</td>
                  <td>{ToMoney(item.contributionSummarized)}</td>
                  <td>{item.annualInterestRate}</td>
                  <td>{ToMoney(item.yields)}</td>
                  <td style={{color: item.withdrawalsSummarized < 0 ? 'red' : 'default'}}>{ToMoney(item.withdrawalsSummarized)}</td>
                  <td style={{color: item.netTotal < 0 ? 'red' : 'default'}}>{ToMoney(item.netTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </section>
        <footer className="modal-card-foot">
          {!isMobile ? (
          <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
            <thead>
              <tr key={1}>
                <th>CANTIDAD QUE PUEDE RETIRAR DEL {year - 1}:</th>
                <th>CANTIDAD QUE RECIBE REDONDEADA:</th>
                <th>CANTIDAD QUE SE QUEDA EN EL FONDO DE AHORRO:</th>
                <th>NUEVO SALDO EN FONDO DE AHORRO PARA EL 2025:</th>
              </tr>
            </thead>
            <tbody>
              {statementData.map((item, index) => (
                <tr key={`${uuid()}`}>
                  <td>{ToMoney(item.amountAvailableToWithdrawal)}</td>
                  <td>{ToMoney(item.amountAvailableToWithdrawalRounded)}</td>
                  <td>{ToMoney(item.amountToWithhold)}</td>
                  <td>{ToMoney(item.netBalanceForCurrentYear)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
            <>
            <strong>CANTIDAD QUE PUEDE RETIRAR DEL {year - 1}:</strong>
            <label>{ToMoney(statementData[0].amountAvailableToWithdrawal)}</label><br />
            <strong>CANTIDAD QUE RECIBE REDONDEADA:</strong>
            <label>{ToMoney(statementData[0].amountAvailableToWithdrawalRounded)}</label><br />
            <strong>CANTIDAD QUE SE QUEDA EN EL FONDO DE AHORRO:</strong>
            <label>{ToMoney(statementData[0].amountToWithhold)}</label><br />
            <strong>NUEVO SALDO EN FONDO DE AHORRO PARA EL 2025:</strong>
            <label>{ToMoney(statementData[0].netBalanceForCurrentYear)}</label><br />
            </>
          )}
        </footer>
      </div>
    </div>
  )
};

export default StatementReportWebModal;