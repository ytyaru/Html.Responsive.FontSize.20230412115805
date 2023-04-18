create table authors (
    id integer primary key not null,
    name text not null check(0<length(name) and length(name)<=100)
);
