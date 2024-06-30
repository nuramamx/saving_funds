enum ProcedureName {
  // Administration
  AGREEMENT_CREATE = 'SELECT * FROM administration.agreement_create(:name);',
  AGREEMENT_UPDATE = 'SELECT * FROM administration.agreement_update(:id,:name);',
  // Catalog
  ASSOCIATE_CREATE = 'SELECT * FROM catalog.associate_create(:firstname,:middlename,:paternal_lastname,:maternal_lastname,:rfc,:gender);',
  ASSOCIATE_UPDATE = 'SELECT * FROM catalog.associate_update(:id,:name,:rfc,:gender);',
  ASSOCIATE_DETAIL_CREATE = 'SELECT * FROM catalog.associate_detail_create(:associate_id,:agreement_id,:dependency_key,:category,:salary,:social_contribution,:fortnightly_contribution);',
  ASSOCIATE_DETAIL_UPDATE = 'SELECT * FROM catalog.associate_detail_create(:id,:agreement_id,:dependency_key,:category,:salary,:social_contribution,:fortnightly_contribution);',
  ADDRESS_CREATE = 'SELECT * FROM catalog.address_create(:associate_id,:city_id,:street,:settlement,:town,:postal_code,:phone,:mobile,:email);',
  ADDRESS_UPDATE = 'SELECT * FROM catalog.address_update(:id,:city_id,:street,:settlement,:town,:postal_code,:phone,:mobile,:email);',
  WORKPLACE_CREATE = 'SELECT * FROM catalog.workplace_create(:associate_id,:key,:name,:phone);',
  WORKPLACE_UPDATE = 'SELECT * FROM catalog.workplace_update(:id,:key,:name,:phone);',
  BENEFICIARY_CREATE = 'SELECT * FROM catalog.beneficiary_create(:associate_id,:beneficiaries);',
  BENEFICIARY_UPDATE = 'SELECT * FROM catalog.beneficiary_create(:id,:beneficiaries);',
  // Process
  BORROW_CREATE = 'SELECT * FROM process.borrow_create(:associate_id,:requested_amount,:period,:annual_rate,:is_fortnightly,:is_cleared);',
  // Log
  AUDIT_CREATE = 'SELECT * FROM log.audit_create(:user_id,:previous_data,:new_data)'
}

export { ProcedureName }