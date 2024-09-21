enum ViewName {
  // Administration
  AGREEMENT_ALL = 'select * from system.agreement_list_view;',
  AGREEMENT_BY_ID = 'select * from system.agreement_list_view WHERE id = :id;',
  STATE_ALL = 'select * from system.state_list_view;',
  CITY_ALL = 'select * from system.city_list_view;',
  BORROW_ANNUAL_RATE_ALL = 'select * from system.borrow_annual_rate_list_view;',
  SAVING_FUND_ANNUAL_RATE_ALL = 'select * from system.saving_fund_annual_rate_list_view;',
  // Catalog
  ASSOCIATE_LIST = 'select * from catalog.associate_list_view;',
  // Process
  BORROW_LIST = 'select * from process.borrow_list_view;'

  // Log
}

export { ViewName }