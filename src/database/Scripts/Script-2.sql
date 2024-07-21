select *
    ,to_char(b.created_at, 'YYYY-MM-dd') as created_at
  from process.borrow as b
  join process.borrow_detail as bd on b.id = bd.id
  join "catalog".associate as a on b.associate_id = a.id
  

select * from process.borrow as b ;
select * from process.borrow_detail as bd ;