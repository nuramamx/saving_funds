enum ProcedureName {
  //TODO: Change all parameter names to include "p_" at beginning.
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
  BORROW_HISTORY_LIST_BY_ASSOCIATE_ID = 'select * from process.borrow_history_by_associate_id(:p_associate_id);',
  BORROW_DEBTOR_LIST = 'select * from process.borrow_debtor_list();',
  PAYMENT_LIST_BY_BORROW_ID = 'select * from process.payment_list_by_borrow_id(:borrow_id);',
  PAYMENT_CREATE = 'select * from process.payment_create(:p_borrow_id, :p_number, :p_paid_amount);',
  SAVING_FUND_CREATE = 'select * from process.saving_fund_create(:p_associate_id, :p_opening_balance, :p_is_fortnightly)',
  SAVING_FUND_LIST = 'select * from process.saving_fund_list(:p_filter, :p_page, :p_page_size);',
  SAVING_FUND_TRANSACTION_LIST = 'select * from process.saving_fund_transaction_list(:p_saving_fund_id, :p_year);',
  CONTRIBUTION_CREATE = 'select * from process.contribution_create(:p_saving_fund_id, :p_amount, :p_applied_at);',
  WITHDRAWAL_CREATE = 'select * from process.withdrawal_create(:p_saving_fund_id, :p_amount, :p_is_interest);',
  // Log
  AUDIT_CREATE = 'select * from log.audit_create(:user_id,:previous_data,:new_data)'
}

export { ProcedureName }