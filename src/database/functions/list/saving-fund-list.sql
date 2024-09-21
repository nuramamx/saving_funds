--drop function process.saving_fund_list;
create or replace function process.saving_fund_list(
  in p_associate_id integer
)
returns table (
  id integer,
  associate_id integer,
  associate_name text,
  agreement_name varchar,
  salary numeric(20,6),
  annual_rate numeric(20,6),
  opening_balance numeric(20,6),
  is_fortnightly boolean,
  balance numeric(20,6),
  yields numeric(20,6),
  total numeric(20,6),
  contributions numeric(20,6),
  withdrawals numeric(20,6)
) as $$
declare
begin
  return query
  select
    d.id
    ,d.associate_id
    ,d.associate_name
    ,d.agreement_name
    ,d.salary
    ,d.annual_rate
    ,d.opening_balance
    ,d.is_fortnightly
    ,d.balance
    ,d.yields
    ,d.balance + d.yields as total
    ,d.contributions
    ,d.withdrawals
  from (
    select 
      sf.id
      ,sf.associate_id
      ,a."name"::text as associate_name
      ,ag."name" as agreement_name
      ,(a.detail->>'salary')::numeric(20,6) as salary
      ,sf.opening_balance
      ,sf.annual_rate
      ,sf.is_fortnightly
      ,(coalesce(contribution.amount,0) - coalesce(withdrawal.amount, 0)) as balance
      ,process.contribution_get_accrued_yields(sf.id) as yields
      ,(coalesce(contribution.amount, 0)) as contributions
      ,(coalesce(withdrawal.amount)) as withdrawals
    from process.saving_fund as sf
    join "catalog".associate as a on sf.associate_id = a.id
    join "system".agreement as ag on (a.detail->>'agreementId')::integer = ag.id
    left join lateral (
      select
        sum(c.amount) as amount
      from process.contribution as c
      where sf.id = c.saving_fund_id 
    ) as contribution on true
    left join lateral (
      select
        sum(w.amount) as amount
      from process.withdrawal as w
      where sf.id = w.saving_fund_id
      and w.is_yields = false
    ) as withdrawal on true
  ) as d
  where d.associate_id = p_associate_id;
end;
$$ language plpgsql;
