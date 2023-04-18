create table chapters (
    id integer primary key not null,
    wid integer not null references works(id),
    seq integer not null references episodes(seq),
    level integer not null default 0, -- 0:話, 1:章, 2:部
    title text not null default ''
)
insert into episodes values({{workId}}, {{seq}}, 2);
