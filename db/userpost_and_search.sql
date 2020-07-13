select * from posts p
join users u on p.author_id = u.id
where p.title like '%' || $1 || '%' and u.id = $2;