-- auto-generated definition
create table users
(
    id         int auto_incrementprimary key,
    username   varchar(255) null,
    password   varchar(80)  null,
    first_name varchar(200) null,
    constraint users_username_uindex unique (username)
);

