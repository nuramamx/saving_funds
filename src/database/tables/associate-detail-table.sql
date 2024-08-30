--drop table if exists catalog.associate_detail cascade;
create table if not exists "catalog".associate_detail
(
  id integer generated always as identity,
  associate_id integer not null,
  agreement_id integer not null,
  dependency_key varchar(10) not null,
  category varchar(8) not null,
  salary numeric(20,6) constraint salary_positive check (salary > 0) not null,
  social_contribution numeric(20,6) constraint social_contribution check (social_contribution > 0) not null,
  fortnightly_contribution numeric(20,6) constraint fortnightly_contribution check (fortnightly_contribution > 0) not null,
  request_date timestamp with time zone not null default current_timestamp,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint associate_detail_pkey primary key (id),
  constraint associate_detail_associate_id_key unique (associate_id),
  constraint associate_detail_associate_id_fkey foreign key (associate_id)
    references "catalog".associate (id),
  constraint associate_detail_agreement_id_fkey foreign key (agreement_id)
    references administration.agreement (id)
);