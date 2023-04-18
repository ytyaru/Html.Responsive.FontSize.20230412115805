create table episodes (
    id integer primary key not null,
    wid integer not null references works(id),
    seq integer not null,
    created text not null default CURRENT_TIMESTAMP,
    updated text not null default CURRENT_TIMESTAMP,
    published text not null default CURRENT_TIMESTAMP,
    chars integer not null,
    summary text not null default '' check(0<=length(catch) and length(catch)<=100),
    content text not null default ''
);
