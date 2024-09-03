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
}

const AppConstants: AppConstants = {
  api: `${process.env.REACT_APP_API_URL}`,
  apiAssociate: `${process.env.REACT_APP_API_URL}/associate`,
  apiPayment: `${process.env.REACT_APP_API_URL}/payment`,
  apiBorrow: `${process.env.REACT_APP_API_URL}/borrow`,
  apiSavingFund: `${process.env.REACT_APP_API_URL}/savingfund`,
  apiContribution: `${process.env.REACT_APP_API_URL}/contribution`,
  apiWithdrawal: `${process.env.REACT_APP_API_URL}/withdrawal`,
  apiCity: `${process.env.REACT_APP_API_URL}/city`,
  apiState: `${process.env.REACT_APP_API_URL}/state`,
  apiAgreement: `${process.env.REACT_APP_API_URL}/agreement`,
  apiAnnualRate: `${process.env.REACT_APP_API_URL}/annual_rate`,
  apiBatch: `${process.env.REACT_APP_API_URL}/batch`
}

export default AppConstants;