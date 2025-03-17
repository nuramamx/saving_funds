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

const currentHost = process.env.REACT_APP_API_URL;

const AppConstants: AppConstants = {
  api: `${currentHost}`,
  apiAssociate: `${currentHost}/associate`,
  apiPayment: `${currentHost}/payment`,
  apiBorrow: `${currentHost}/borrow`,
  apiSavingFund: `${currentHost}/savingfund`,
  apiContribution: `${currentHost}/contribution`,
  apiWithdrawal: `${currentHost}/withdrawal`,
  apiCity: `${currentHost}/city`,
  apiState: `${currentHost}/state`,
  apiAgreement: `${currentHost}/agreement`,
  apiAnnualRate: `${currentHost}/annual_rate`,
  apiBatch: `${currentHost}/batch`,
  apiReport: `${currentHost}/report`,
  apiSecurity: `${currentHost}/security`
}

export default AppConstants;