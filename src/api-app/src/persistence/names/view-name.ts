enum ViewName {
  // Administration
  AGREEMENT_ALL = 'select * from administration.agreement_list_view;',
  AGREEMENT_BY_ID = 'select * from administration.agreement_list_view WHERE id = :id;',
  STATE_ALL = 'select * from administration.state_list_view;',
  CITY_ALL = 'select * from administration.city_list_view;',
  ANNUAL_RATE_ALL = 'select * from administration.annual_rate_list_view;',
  // Catalog
  ASSOCIATE_LIST = 'select * from catalog.associate_list_view;',
  // Process
  BORROW_LIST = 'select * from process.borrow_list_view;'

  // Log
}

export { ViewName }