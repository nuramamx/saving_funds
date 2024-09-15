enum FunctionName {
  // Search
  ASSOCIATE_SEARCH_BY_ID_OR_NAME = 'select * from catalog.associate_list_by_id_or_name(:p_associate_id, :p_name);',
  // System
  AGREEMENT_CREATE = 'select * from system.agreement_create(:p_name);',
  AGREEMENT_UPDATE = 'select * from system.agreement_update(:p_id, :p_name);',
  BATCH_LIST = 'select * from system.batch_list();',
  BATCH_CREATE = 'select * from system.batch_create(:p_name, :p_batch_function, :p_details);',
  BATCH_UPLOAD_CREATE = '',
  // Catalog
  ASSOCIATE_CREATE = 'select * from catalog.associate_create(:p_name, :p_rfc, :p_gender, :p_detail, :p_address, :p_workplace, :p_beneficiaries);',
  ASSOCIATE_UPDATE = 'select * from catalog.associate_update(:p_id, :p_name, :p_rfc, :p_gender);',
  ASSOCIATE_DETAIL_CREATE = 'select * from catalog.associate_detail_create(:p_associate_id, :p_agreement_id, :p_dependency_key, :p_category, :p_salary, :p_social_contribution, :p_fortnightly_contribution);',
  ASSOCIATE_DETAIL_UPDATE = 'select * from catalog.associate_detail_create(:p_id, :p_agreement_id, :p_dependency_key, :p_category, :p_salary, :p_social_contribution, :p_fortnightly_contribution);',
  ADDRESS_CREATE = 'select * from catalog.address_create(:p_associate_id, :p_city_id, :p_street, :p_settlement, :p_town, :p_postal_code, :p_phone, :p_mobile, :p_email);',
  ADDRESS_UPDATE = 'select * from catalog.address_update(:p_id, :p_city_id, :p_street, :p_settlement, :p_town, :p_postal_code, :p_phone, :p_mobile, :p_email);',
  WORKPLACE_CREATE = 'select * from catalog.workplace_create(:p_associate_id, :p_key, :p_name, :p_phone);',
  WORKPLACE_UPDATE = 'select * from catalog.workplace_update(:p_id, :p_key, :p_name, :p_phone);',
  BENEFICIARY_CREATE = 'select * from catalog.beneficiary_create(:p_associate_id, :p_beneficiaries);',
  BENEFICIARY_UPDATE = 'select * from catalog.beneficiary_create(:p_id, :p_beneficiaries);',
  // Process
  BORROW_CREATE = 'select * from process.borrow_create(:p_associate_id, :p_requested_amount::numeric, :p_period, :p_is_fortnightly, :p_start_at::timestamp);',
  BORROW_HISTORY_LIST_BY_ASSOCIATE_ID = 'select * from process.borrow_history_list_by_associate_id(:p_associate_id);',
  BORROW_DEBTOR_LIST = 'select * from process.borrow_debtor_list();',
  PAYMENT_LIST_BY_BORROW_ID = 'select * from process.payment_list_by_borrow_id(:p_borrow_id);',
  PAYMENT_CREATE = 'select * from process.payment_create(:p_borrow_id, :p_number, :p_paid_amount);',
  SAVING_FUND_CREATE = 'select * from process.saving_fund_create(:p_associate_id, :p_opening_balance, :p_is_fortnightly)',
  SAVING_FUND_LIST = 'select * from process.saving_fund_list(:p_filter, :p_page, :p_page_size);',
  SAVING_FUND_TRANSACTION_LIST = 'select * from process.saving_fund_transaction_list(:p_saving_fund_id, :p_year);',
  CONTRIBUTION_CREATE = 'select * from process.contribution_create(:p_saving_fund_id, :p_amount, :p_applied_at);',
  WITHDRAWAL_CREATE = 'select * from process.withdrawal_create(:p_saving_fund_id, :p_amount, :p_is_interest);',
  // Log
  AUDIT_CREATE = 'select * from log.audit_create(:p_user_id, :p_previous_data, :p_new_data)'
}

export { FunctionName }