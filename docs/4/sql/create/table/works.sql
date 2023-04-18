create table works (
    id integer primary key not null,
    aid integer not null references authors(id),
    name text not null check(0<length(name) and length(name)<=100),
    catch text not null default '' check(0<=length(catch) and length(catch)<=35),
    logline text not null default '' check(0<=length(logline) and length(logline)<=100),
    synopsis text not null default '' check(0<=length(synopsis) and length(synopsis)<=100),
    hook text not null default '' check(0<=length(hook) and length(hook)<=100),
    central_question not null default '' check(0<=length(central_question) and length(central_question)<=100),
    description text not null default '' check(0<=length(description) and length(description)<=80),
    fixed integer not null default 0 check(0=fixed or 1=fixed)
);
