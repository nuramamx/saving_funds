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

  // Log
}

export { ViewName }