import { useEffect, useState } from 'react';
import { objectToCamel } from 'ts-case-convert';
import { v4 as uuid } from "uuid";
import AppConstants from '../../../../core/constants/app-constants';
import CommandResponseInfo from '../../../../core/interfaces/info/command-response-info';
import ToMoney from '../../../../core/util/conversions/money-conversion';
import SavingFundTransactionListSpec from '../../../../core/interfaces/specs/list/saving-fund-transaction-list-spec';
import SFSelectYear from '../../../../components/dynamic-elements/sf-select-year';
import useAuthStore from '../../../../core/stores/auth-store';

type TransactionListModalParams = {
  savingFundId: number;
  associateName: string;
  show: boolean;
  onClose: () => void;
};

export default function TransactionListModal({ savingFundId, associateName, show, onClose}: TransactionListModalParams) {
  const { token } = useAuthStore();
  const [showModal, setShowModal] = useState(show);
  const [year, setYear] = useState(0);
  const [transactions, setTransactions] = useState<SavingFundTransactionListSpec[]>([]);

  const handleClose = () => {
    if (onClose) {
      setYear(0);
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
      case 'withdrawal-yields':
        return 'Retiro de Intereses';
        case 'fix':
          return 'Corrección';
      default:
        return 'No identificado';
    }
  };

  const fetchPayments = async () => {
    try {
      const result = await fetch(`${AppConstants.apiSavingFund}/transactions/${savingFundId}/${year}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
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
        <p className="modal-card-title">
          Transacciones<br />
          <label style={{ fontSize: '12px'}}>{associateName}</label>
        </p>
        <button className="delete" aria-label="close" onClick={handleClose}></button>
      </header>
      <section className="modal-card-body" style={{fontSize: '12px'}}>
        <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
          <thead>
            <tr key={1}>
              <th>#</th>
              <th>A&ntilde;o</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions !== undefined && transactions?.length > 0 ? (
              transactions.map((savingFund: SavingFundTransactionListSpec, index) => (
              <tr key={`${uuid()}`}
                style={{ 
                  backgroundColor: (savingFund.transactionType.includes('withdrawal') || savingFund.transactionType.includes('fix')) ? '#f2d7d5' : 'default'
                }}>
                <td>{index+1}</td>
                <td>{savingFund.year}</td>
                <td>{savingFund.transactionDate}</td>
                <td>{parseTransactionType(savingFund.transactionType)}</td>
                <td>{ToMoney(savingFund.amount)}</td>
                <td>{ToMoney(savingFund.runningBalance)}</td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={8} style={{textAlign: 'center'}}>No hay transacciones disponibles en el {year}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <footer className="modal-card-foot  is-flex is-justify-content-space-between">
        <div>
          <label style={{ fontSize: '1.2em' }}>Aportaciones {year === 0 ? 'totales' : 'del año'}:</label>&nbsp;&nbsp;
          <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
            {ToMoney(transactions.filter(x => x.transactionType === 'contribution').reduce((sum, transaction) => (sum + Number(transaction.amount)), 0))}
          </label><br />
          <label style={{ fontSize: '1.2em' }}>Retiros {year === 0 ? 'totales' : 'del año'}:</label>&nbsp;&nbsp;
          <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
            {ToMoney(transactions.filter(x => x.transactionType === 'withdrawal').reduce((sum, transaction) => (sum + Number(transaction.amount)), 0))}
          </label><br />
          <label style={{ fontSize: '1.2em' }}>Rendimientos {year === 0 ? 'totales' : 'del año'}:</label>&nbsp;&nbsp;
          <label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
            {ToMoney(transactions.reduce((sum, transaction) => (sum + Number(transaction.partialYields)), 0))}
          </label>
        </div>
        <div>
          <label style={{ fontSize: '2em' }}>Total:</label>&nbsp;&nbsp;
          <label style={{ fontSize: '2em', fontWeight: 'bold' }}>
            {
              ToMoney(
                transactions.filter(x => x.transactionType === 'contribution').reduce((sum, transaction) => (sum + Number(transaction.amount)), 0) +
                transactions.filter(x => x.transactionType === 'withdrawal').reduce((sum, transaction) => (sum + Number(transaction.amount)), 0) +
                transactions.reduce((sum, transaction) => (sum + Number(transaction.partialYields)), 0)
              )
            }
          </label>
        </div>
        <div></div>
        <div></div>
        <div className='is-pulled-right'>
          <SFSelectYear id={'year-list'} name="" value={year} onChange={(value) => setYear(value)} />
        </div>
      </footer>
    </div>
  </div>
  )
};