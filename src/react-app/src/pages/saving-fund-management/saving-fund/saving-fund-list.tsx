import { useEffect, useState } from 'react'
import { objectToCamel } from 'ts-case-convert';
import AppConstants from '../../../core/constants/app-constants';
import ToMoney from '../../../core/util/conversions/money-conversion';
import CommandResponseInfo from '../../../core/interfaces/info/command-response-info';
import ContributionCreateActionButton from './actions/contribution-create-action-button';
import WithdrawalCreateActionButton from './actions/withdrawal-create-action-button';
import SavingFundListSpec from '../../../core/interfaces/specs/list/saving-fund-list-spec';
import SavingFundTransactionListActionButton from './actions/transaction-list-action';

export default function SavingFundList() {
  const [savingFunds, setSavingFunds] = useState<SavingFundListSpec[]>([]);

  const fectchSavingFunds = async () => {
    const result = await fetch(`${AppConstants.apiSavingFund}/list`, {
      method: 'GET'
    });

    if (!result.ok)
      throw new Error(result.statusText);

    const response = await result.json() as CommandResponseInfo;
    const list = objectToCamel(response.data) as SavingFundListSpec[];
    
    setSavingFunds(list);
  };

  const handleReload = () => {
    fectchSavingFunds();
  }

  useEffect(() => {
    handleReload();
  }, []);

  return (
    <div className="columns">
      <div className="column">
        <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
          <thead>
            <tr key={1}>
              <th>Id</th>
              <th>Socio</th>
              <th>Convenio</th>
              <th>Salario</th>
              <th>Aportaci&oacute;n inicial</th>
              <th>Balance</th>
              <th>Intereses</th>
              <th>Aportaciones</th>
              <th>Retiros</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {savingFunds !== undefined && savingFunds?.length > 0 ? (
              savingFunds.map((savingFund: SavingFundListSpec) => (
              <tr key={savingFund.id}>
                <td>{savingFund.id}</td>
                <td>{savingFund.associateName}</td>
                <td>{savingFund.agreementName}</td>
                <td>{ToMoney(savingFund.salary)}</td>
                <td>{ToMoney(savingFund.openingBalance)}</td>
                <td>{ToMoney(savingFund.balance)}</td>
                <td>{ToMoney(savingFund.accruedInterest)}</td>
                <td>{ToMoney(savingFund.contributions)}</td>
                <td>{ToMoney(savingFund.withdrawals)}</td>
                <td>{ToMoney(savingFund.total)}</td>
                <td>
                  <ContributionCreateActionButton savingFundId={savingFund.id} onClose={handleReload} />&nbsp;
                  <WithdrawalCreateActionButton savingFundId={savingFund.id} onClose={handleReload} />&nbsp;
                  <SavingFundTransactionListActionButton savingFundId={savingFund.id} />
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={9} style={{textAlign: 'center'}}>No hay fondos de ahorro disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}