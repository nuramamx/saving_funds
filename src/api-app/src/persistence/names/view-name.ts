enum ViewName {
  // Administration
  AGREEMENT_ALL = 'SELECT id, name FROM administration.agreement_view',
  AGREEMENT_BY_ID = 'SELECT id, name FROM administration.agreement_view WHERE id = :id',
  STATE_ALL = 'SELECT id, name FROM administration.state_view',
  CITY_ALL = 'SELECT id, state_id, name, state_name FROM administration.city_view',
  // Catalog

  // Process

  // Log
}

export { ViewName }