create table users (
profile_picture varchar(1000),
username varchar(20),
password varchar(300),
first_name varchar(20),
last_name varchar(20),
email varchar(150),
id serial primary key
);  

create table posts (
author_id int references users(id),
post_id serial primary key, 
title varchar(40),
image varchar(5000),
details varchar(1000)
);  