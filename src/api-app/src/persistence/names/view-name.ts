enum ViewName {
  // Administration
  AGREEMENT_ALL = 'SELECT id, name FROM administration.agreement_all',
  AGREEMENT_BY_ID = 'SELECT id, name FROM administration.agreement_all WHERE id = :id',
  STATE_ALL = 'SELECT id, name FROM administration.state',
  CITY_ALL = 'SELECT id, state_id, name, state_name FROM administration.city',
  // Catalog

  // Process

  // Log
}

export { ViewName }