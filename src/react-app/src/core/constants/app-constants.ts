interface AppConstants {
  api: string;
  apiAssociate: string;
  apiBorrow: string;
  apiSavingFund: string;
  apiContribution: string;
  apiWithdrawal: string;
  apiPayment: string;
  apiCity: string;
  apiState: string;
  apiAgreement: string;
  apiAnnualRate: string;
  apiBatch: string;
  apiReport: string;
  apiSecurity: string;
}

const currentHost = window.location.hostname;
const port = '8081';

const AppConstants: AppConstants = {
  api: `http://${currentHost}:${port}`,
  apiAssociate: `http://${currentHost}:${port}/associate`,
  apiPayment: `http://${currentHost}:${port}/payment`,
  apiBorrow: `http://${currentHost}:${port}/borrow`,
  apiSavingFund: `http://${currentHost}:${port}/savingfund`,
  apiContribution: `http://${currentHost}:${port}/contribution`,
  apiWithdrawal: `http://${currentHost}:${port}/withdrawal`,
  apiCity: `http://${currentHost}:${port}/city`,
  apiState: `http://${currentHost}:${port}/state`,
  apiAgreement: `http://${currentHost}:${port}/agreement`,
  apiAnnualRate: `http://${currentHost}:${port}/annual_rate`,
  apiBatch: `http://${currentHost}:${port}/batch`,
  apiReport: `http://${currentHost}:${port}/report`,
  apiSecurity: `http://${currentHost}:${port}/security`
}

export default AppConstants;