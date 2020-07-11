insert into users (
  username,
  password,
  profile_picture
) values (
  $1,
  $2, 
  $3
)

returning *;