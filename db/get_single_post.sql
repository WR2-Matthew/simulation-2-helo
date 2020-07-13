select * from posts p 
join users u on u.id = p.author_id
where p.post_id = $1;