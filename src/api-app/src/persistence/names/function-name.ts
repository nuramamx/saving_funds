enum FunctionName {
  // Search
  ASSOCIATE_SEARCH_BY_ID_OR_NAME = 'select * from catalog.associate_list_by_id_or_name(:p_associate_id, :p_name);',
  // System
  AGREEMENT_CREATE = 'select * from system.agreement_create(:p_name);',
  AGREEMENT_UPDATE = 'select * from system.agreement_update(:p_id, :p_name);',
  BATCH_LIST = 'select * from system.batch_list();',
  BATCH_CREATE = 'select * from system.batch_create(:p_name, :p_batch_function, :p_details);',
  BATCH_UPLOAD_CREATE = '',
  SAVING_FUND_ANNUAL_RATE_UPDATE = 'select * from system.saving_fund_annual_rate_update(:p_id, :p_rate);',
  BORROW_ANNUAL_RATE_UPDATE = 'select * from system.borrow_annual_rate_update(:p_id, :p_rate);',
  // Catalog
  ASSOCIATE_CREATE = 'select * from catalog.associate_create(:p_name, :p_rfc, :p_gender, :p_detail, :p_address, :p_workplace, :p_beneficiaries);',
  ASSOCIATE_LIST = 'select * from catalog.associate_list(:p_limit, :p_offset);',
  // Process
  BORROW_CREATE = 'select * from process.borrow_create(:p_associate_id, :p_requested_amount::numeric, :p_period, :p_is_fortnightly, :p_start_at::timestamp);',
  BORROW_HISTORY_LIST_BY_ASSOCIATE_ID = 'select * from process.borrow_history_list_by_associate_id(:p_associate_id);',
  BORROW_DEBTOR_LIST = 'select * from process.borrow_debtor_list();',
  PAYMENT_LIST_BY_BORROW_ID = 'select * from process.payment_list_by_borrow_id(:p_borrow_id);',
  PAYMENT_CREATE = 'select * from process.payment_create(:p_borrow_id, :p_number, :p_paid_amount);',
  SAVING_FUND_CREATE = 'select * from process.saving_fund_create(:p_associate_id, :p_opening_balance, :p_is_fortnightly)',
  SAVING_FUND_LIST = 'select * from process.saving_fund_list(:p_associate_id);',
  SAVING_FUND_TRANSACTION_LIST = 'select * from process.saving_fund_transaction_list(:p_saving_fund_id, :p_year);',
  CONTRIBUTION_CREATE = 'select * from process.contribution_create(:p_saving_fund_id, :p_amount, :p_applied_at);',
  WITHDRAWAL_CREATE = 'select * from process.withdrawal_create(:p_saving_fund_id, :p_amount, :p_is_yields);',
  STATEMENT_REPORT_LIST = 'select * from process.statement_report_list(:p_associate_id);',
  STATEMENT_REPORT_DATA = 'select * from process.statement_report_data(:p_associate_id);',
  BORROW_AUTHORIZATION_REPORT_DATA = 'select * from process.borrow_authorization_report_data(:p_borrow_id);',
  // Log
  AUDIT_CREATE = 'select * from log.audit_create(:p_user_id, :p_previous_data, :p_new_data)'
}

export { FunctionName }