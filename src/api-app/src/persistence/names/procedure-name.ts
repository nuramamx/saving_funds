enum Procedure {
  // Administration
  AGREEMENT_CREATE = 'CALL administration.agreement_create(:name)',
  AGREEMENT_UPDATE = 'CALL administration.agreement_update(:id,:name)',
  // Catalog
  ASSOCIATE_CREATE = 'CALL catalog.associate_create(:name,:rfc,:gender)',
  ASSOCIATE_UPDATE = 'CALL catalog.associate_update(:id,:name,:rfc,:gender)',
  ASSOCIATE_DETAIL_CREATE = 'CALL catalog.associate_detail_create(:associate_id,:agreement_id,:dependency_key,:category,:salary,:social_contribution,:fortnightly_contribution,:request_date)',
  ASSOCIATE_DETAIL_UPDATE = 'CALL catalog.associate_detail_create(:id,:agreement_id,:dependency_key,:category,:salary,:social_contribution,:fortnightly_contribution)',
  ADDRESS_CREATE = 'CALL catalog.address_create(:associate_id,:city_id,:street,:settlement,:town,:postal_code,:phone,:mobile,:email)',
  ADDRESS_UPDATE = 'CALL catalog.address_update(:id,:city_id,:street,:settlement,:town,:postal_code,:phone,:mobile,:email)',
  WORKPLACE_CREATE = 'CALL catalog.workplace_create(:associate_id,:key,:name,:phone)',
  WORKPLACE_UPDATE = 'CALL catalog.workplace_update(:id,:key,:name,:phone)',
  BENEFICIARY_CREATE = 'CALL catalog.beneficiary_create(:associate_id,:name,:percentage)',
  BENEFICIARY_UPDATE = 'CALL catalog.beneficiary_create(:id,:name,:percentage)',
  // Process
  BORROW_CREATE = 'CALL process.borrow_create(:associate_id,:requested_amount,:period,:annual_rate,:is_fortnightly,:is_cleared)',
  // Log
  AUDIT_CREATE = 'CALL log.audit_create(:user_id,:previous_data,:new_data)'
}

export type { Procedure }