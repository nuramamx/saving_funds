enum ProcedureName {
  // Search
  ASSOCIATE_SEARCH_BY_ID_OR_NAME = 'select * from catalog.associate_search_by_id_or_name(:associate_id,:name);',
  // Administration
  AGREEMENT_CREATE = 'select * from administration.agreement_create(:name);',
  AGREEMENT_UPDATE = 'select * from administration.agreement_update(:id,:name);',
  // Catalog
  ASSOCIATE_CREATE = 'select * from catalog.associate_create(:firstname,:middlename,:paternal_lastname,:maternal_lastname,:rfc,:gender);',
  ASSOCIATE_UPDATE = 'select * from catalog.associate_update(:id,:name,:rfc,:gender);',
  ASSOCIATE_DETAIL_CREATE = 'select * from catalog.associate_detail_create(:associate_id,:agreement_id,:dependency_key,:category,:salary,:social_contribution,:fortnightly_contribution);',
  ASSOCIATE_DETAIL_UPDATE = 'select * from catalog.associate_detail_create(:id,:agreement_id,:dependency_key,:category,:salary,:social_contribution,:fortnightly_contribution);',
  ADDRESS_CREATE = 'select * from catalog.address_create(:associate_id,:city_id,:street,:settlement,:town,:postal_code,:phone,:mobile,:email);',
  ADDRESS_UPDATE = 'select * from catalog.address_update(:id,:city_id,:street,:settlement,:town,:postal_code,:phone,:mobile,:email);',
  WORKPLACE_CREATE = 'select * from catalog.workplace_create(:associate_id,:key,:name,:phone);',
  WORKPLACE_UPDATE = 'select * from catalog.workplace_update(:id,:key,:name,:phone);',
  BENEFICIARY_CREATE = 'select * from catalog.beneficiary_create(:associate_id,:beneficiaries);',
  BENEFICIARY_UPDATE = 'select * from catalog.beneficiary_create(:id,:beneficiaries);',
  // Process
  BORROW_CREATE = 'select * from process.borrow_create(:associate_id,:requested_amount::numeric,:period,:is_fortnightly,:start_at::timestamp);',
  // Log
  AUDIT_CREATE = 'select * from log.audit_create(:user_id,:previous_data,:new_data)'
}

export { ProcedureName }