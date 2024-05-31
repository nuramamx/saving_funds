interface AppConstants {
  api: string;
  apiAssociate: string;
  apiCity: string;
  apiState: string;
  apiAgreements: string;
}

const AppConstants: AppConstants = {
  api: `${process.env.REACT_APP_API_URL}`,
  apiAssociate: `${process.env.REACT_APP_API_URL}/associate`,
  apiCity: `${process.env.REACT_APP_API_URL}/city`,
  apiState: `${process.env.REACT_APP_API_URL}/state`,
  apiAgreements: `${process.env.REACT_APP_API_URL}/agreement`
}

export default AppConstants;