import React, { useEffect, useState } from 'react'
import { objectToCamel } from 'ts-case-convert';
import { v4 as uuid } from "uuid";
import AppConstants from '../../../core/constants/app-constants';
import ToMoney from '../../../core/util/conversions/money-conversion';
import CommandResponseInfo from '../../../core/interfaces/info/command-response-info';
import ContributionCreateActionButton from './actions/contribution-create-action-button';
import WithdrawalCreateActionButton from './actions/withdrawal-create-action-button';
import SavingFundListSpec from '../../../core/interfaces/specs/list/saving-fund-list-spec';
import SavingFundTransactionListActionButton from './actions/transaction-list-action';
import SearchAssociate from '../../../components/dynamic-elements/sf-search-associate';
import SavingFundListQuery from '../../../core/interfaces/query/saving-fund-list-query';
import useNotificationStore from '../../../core/stores/notification-store';
import useAuthStore from '../../../core/stores/auth-store';
import StatementReportActionItem from '../associate/action-items/statement-report-action-item';
import RefreshActionButton from '../../../components/action-buttons/refresh-action-button';
import useIsMobile from '../../../core/hooks/use-is-mobile';

export default function SavingFundList() {
  const [savingFunds, setSavingFunds] = useState<SavingFundListSpec[]>([]);
  const [associate, setAssociate] = useState<number>(0);
  const { pushNotification } = useNotificationStore();
  const { token } = useAuthStore();
  const isMobile = useIsMobile();

  const fectchSavingFunds = async () => {
    const result = await fetch(`${AppConstants.apiSavingFund}/list`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        associateId: associate
      } as SavingFundListQuery)
    });

    if (!result.ok)
      throw new Error(result.statusText);

    const response = await result.json() as CommandResponseInfo;
    const list = objectToCamel(response.data) as SavingFundListSpec[];
    
    setSavingFunds(list);
  };

  const handleReload = () => {
    if (associate > 0) {
      try {
        fectchSavingFunds();
      } catch (err: any) {
        pushNotification({ message: err.message, type: 'danger' });
      }
    } else setSavingFunds([]);
  }

  useEffect(() => {
    handleReload();
  }, [associate]);

  return (
    <>
    <div className='is-flex is-flex-direction-column' style={{ height: 'auto'}}>
      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <SearchAssociate
            id="borrow_associate_name"
            name="Socio"
            value={associate}
            readonly={true}
            onChange={(value) => setAssociate(value)} />
        </div>
        <div className="column"></div>
      </div>
      <div className="columns">
        <div className="column" data-tg-tour="Listado de fondos de ahorro disponibles en el sistema previamente filtrados por el socio.">
        {!isMobile && (
          <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
            <thead key={uuid()}>
              <tr>
                <th>Convenio</th>
                <th>Salario</th>
                <th>Aportaci&oacute;n inicial</th>
                <th data-tg-tour="Son las aportaciones durante toda la estadía del socio.">Aportaciones</th>
                <th data-tg-tour="Son todos los retiros realizados por el socio.">Retiros</th>
                <th data-tg-tour="Es el resultado entre: Aportaciones - Retiros.">Balance</th>
                <th data-tg-tour="Son todos los rendimientos generados durante toda la estadía del socio.">Rendimientos</th>
                <th data-tg-tour="Es el resultado entre: Aportaciones - Retiros + Rendimientos.">Total</th>
                <th data-tg-tour="Acciones disponibles: Estado de cuenta, Registrar contribución, Registrar retiro, Listado de transaciones, Editar socio.">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {savingFunds !== undefined && savingFunds?.length > 0 ? (
                savingFunds.map((savingFund: SavingFundListSpec) => (
                <tr key={`rows-${savingFund.id}`}>
                    <>
                      <td>{savingFund.agreementName}</td>
                      <td>{ToMoney(savingFund.salary)}</td>
                      <td>{ToMoney(savingFund.openingBalance)}</td>
                      <td>{ToMoney(savingFund.contributions)}</td>
                      <td>{ToMoney(savingFund.withdrawals)}</td>
                      <td>{ToMoney(savingFund.balance)}</td>
                      <td>{ToMoney(savingFund.yields)}</td>
                      <td>{ToMoney(savingFund.total)}</td>
                      <td>
                        <StatementReportActionItem associateName={savingFund.associateName} associateId={associate} />
                        {savingFund.total > 0 && (
                          <>
                          <ContributionCreateActionButton savingFundId={savingFund.id} onClose={handleReload} />
                          <WithdrawalCreateActionButton savingFundId={savingFund.id} associateId={associate} hasActiveBorrow={savingFund.hasActiveBorrow} onClose={handleReload} />
                          </>
                        )}
                        <SavingFundTransactionListActionButton savingFundId={savingFund.id} associateName={`${savingFund.id} - ${savingFund.associateName}`} onClose={handleReload} />
                      </td>
                    </>
                </tr>))) : (
                <tr key={1}>
                  <td colSpan={11} style={{textAlign: 'center'}}>No hay fondos de ahorro disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
          )}

          {isMobile && (
            <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
              <tbody>
              {savingFunds !== undefined && savingFunds?.length > 0 ? (
                savingFunds.map((savingFund: SavingFundListSpec) => (
                <React.Fragment key={`rows-${savingFund.id}`}>
                  <tr>
                    <td>
                      <strong>Convenio</strong>:<br />
                      <strong>Salario</strong>:<br />
                      <strong>Aportaciones</strong>:<br />
                      <strong>Retiros</strong>:<br />
                      <strong>Balance</strong>:<br />
                      <strong>Rendimientos</strong>:<br />
                      <strong>Total</strong>:<br />
                    </td>
                    <td>
                      {savingFund.agreementName}<br />
                      {ToMoney(savingFund.salary)}<br />
                      {ToMoney(savingFund.contributions)}<br />
                      {ToMoney(savingFund.withdrawals)}<br />
                      {ToMoney(savingFund.balance)}<br />
                      {ToMoney(savingFund.yields)}<br />
                      {ToMoney(savingFund.total)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center', fontSize: '15px' }} colSpan={2}>
                      <StatementReportActionItem associateName={savingFund.associateName} associateId={associate} />&nbsp;&nbsp;
                        {savingFund.total > 0 && (
                          <>
                          <ContributionCreateActionButton savingFundId={savingFund.id} onClose={handleReload} />&nbsp;&nbsp;
                          <WithdrawalCreateActionButton savingFundId={savingFund.id} associateId={associate} hasActiveBorrow={savingFund.hasActiveBorrow} onClose={handleReload} />&nbsp;&nbsp;
                          </>
                        )}
                      <SavingFundTransactionListActionButton savingFundId={savingFund.id} associateName={`${savingFund.id} - ${savingFund.associateName}`} onClose={handleReload} />&nbsp;&nbsp;
                    </td>
                  </tr>
                </React.Fragment>
                ))) : (
                  <tr key={1}>
                    <td colSpan={11} style={{textAlign: 'center'}}>No hay fondos de ahorro disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="bottom-content-container">
        <RefreshActionButton onClick={() => handleReload()} />
      </div>
    </div>
    </>
  )
}