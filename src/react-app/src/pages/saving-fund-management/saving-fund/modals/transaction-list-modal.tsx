import { useEffect, useState } from 'react';
import { objectToCamel } from 'ts-case-convert';
import { v4 as uuid } from "uuid";
import useNotificationStore from '../../../../core/stores/notification-store';
import AppConstants from '../../../../core/constants/app-constants';
import CommandResponseInfo from '../../../../core/interfaces/info/command-response-info';
import ToMoney from '../../../../core/util/conversions/money-conversion';
import SavingFundTransactionListSpec from '../../../../core/interfaces/specs/list/saving-fund-transaction-list-spec';
import SFSelectYear from '../../../../components/dynamic-elements/sf-select-year';

type TransactionListModalParams = {
  savingFundId: number;
  show: boolean;
  onClose: () => void;
};

export default function TransactionListModal({ savingFundId, show, onClose}: TransactionListModalParams) {
  const { pushNotification } = useNotificationStore();
  const [showModal, setShowModal] = useState(show);
  const [year, setYear] = useState(new Date().getFullYear());
  const [transactions, setTransactions] = useState<SavingFundTransactionListSpec[]>([]);

  const handleClose = () => {
    if (onClose) {
      setYear(new Date().getFullYear());
      setTransactions([]);
      onClose();
    }
  };

  const parseTransactionType = (transactionType: string) => {
    switch (transactionType) {
      case 'contribution':
        return 'Aportación';
      case 'withdrawal':
        return 'Retiro';
      case 'withdrawal-interest':
        return 'Retiro de Intereses';
      default:
        return 'No identificado';
    }
  };

  const fetchPayments = async () => {
    try {
      const result = await fetch(`${AppConstants.apiSavingFund}/transactions/${savingFundId}/${year}`, {
        method: 'GET'
      });

      if (!result.ok)
        throw new Error(result.statusText);

      const response = await result.json() as CommandResponseInfo;
      const list = objectToCamel(response.data) as SavingFundTransactionListSpec[];
      
      setTransactions(list);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    setShowModal(show);

    if (savingFundId > 0) fetchPayments();
  }, [show, year]);

  return (
  <div className={`modal ${showModal ? 'is-active' : ''} animate__animated animate__pulse`}>
    <div className="modal-background"></div>
    <div className="modal-card" style={{width: '60%'}}>
      <header className="modal-card-head">
        <p className="modal-card-title">Transacciones</p>
        <button className="delete" aria-label="close" onClick={handleClose}></button>
      </header>
      <section className="modal-card-body" style={{fontSize: '12px'}}>
        <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
          <thead>
            <tr key={1}>
              <th>A&ntilde;o</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Balance</th>
              <th>Rendimientos</th>
            </tr>
          </thead>
          <tbody>
            {transactions !== undefined && transactions?.length > 0 ? (
              transactions.map((savingFund: SavingFundTransactionListSpec) => (
              <tr key={`${uuid()}`}
                style={{ 
                  backgroundColor: (savingFund.transactionType.includes('withdrawal')) ? '#f2d7d5' : 'default'
                }}>
                <td>{savingFund.year}</td>
                <td>{savingFund.transactionDate}</td>
                <td>{parseTransactionType(savingFund.transactionType)}</td>
                <td>{ToMoney(savingFund.amount)}</td>
                <td>{ToMoney(savingFund.runningBalance)}</td>
                <td>{ToMoney(savingFund.partialYields)}</td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={6} style={{textAlign: 'center'}}>No hay transacciones disponibles en el {year}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <footer className="modal-card-foot  is-flex is-justify-content-space-between">
        <div>
        <label style={{ fontSize: '2vh' }}>Rendimientos del a&ntilde;o:</label>&nbsp;&nbsp;
        <label style={{ fontWeight: 'bold', fontSize: '2vh' }}>
          {ToMoney(transactions.reduce((sum, transaction) => (sum + Number(transaction.partialYields)), 0))}
        </label>
        </div>
        <div className='is-pulled-right'>
          <SFSelectYear id={'year-list'} name="" value={year} onChange={(value) => setYear(value)} />
        </div>
      </footer>
    </div>
  </div>
  )
};