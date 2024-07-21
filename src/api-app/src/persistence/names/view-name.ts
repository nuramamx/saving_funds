enum ViewName {
  // Administration
  AGREEMENT_ALL = 'select * from administration.agreement_view;',
  AGREEMENT_BY_ID = 'select * from administration.agreement_view WHERE id = :id;',
  STATE_ALL = 'select * from administration.state_view;',
  CITY_ALL = 'select * from administration.city_view;',
  ANNUAL_RATE_ALL = 'select * from administration.annual_rate_view;',
  // Catalog
  ASSOCIATE_LIST = 'select * from catalog.list_associate_view;',
  // Process
  BORROW_LIST = 'select * from process.list_borrow_view;',
  BORROW_HISTORY_LIST_BY_ASSOCIATE_ID = 'select * from process.borrow_history_by_associate_id(:p_associate_id);',
  PAYMENT_LIST_BY_BORROW_ID = 'select * from process.payment_list_by_borrow_id(:borrow_id);'

  // Log
}

export { ViewName }