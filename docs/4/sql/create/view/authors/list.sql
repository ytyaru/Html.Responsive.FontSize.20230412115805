-- 著者一覧
-- 著者名、総字数、作品数（完結作品数、未完結作品数、エタ作品数（6ヶ月(180日)以上更新していない））、代表作品（0〜3）、連絡先（モナコインアドレス、GitHub、Mastodon）
create view authors_list as 
select a.name name, sum(e.chars) chars, max(e.updated) 
from authors a 
inner join works w on a.id=w.aid 
inner join episodes e on w.id=e.wid 
group by a.id;

authors = select id, name from authors;
for (let a of authors) {
    select count(*) work_num from works where aid={{a.id}};
    select count(*) fixed_work_num from works where aid={{a.id}} and fixed=1;
    select count(*) incmp_work_num from works where aid={{a.id}} and fixed=0;
    select count(*) eternal_work_num from works where aid={{a.id}} and fixed=0 and updated < date('now', 'utc', '-6 months');
    fixed_works = (select w.id, w.title, max(e.updated), sum(e.chars) 
        from works w
        inner join episodes e on w.id=e.wid 
        where w.aid={{a.id}} and w.fixed=1 
        group by w.id
        order by max(e.updated) desc, max(e.chars) desc;
}

create view authors_list as 
select a.name name, sum(e.chars) chars, max(e.updated) 
from authors a 
inner join works w on a.id=w.aid 
inner join episodes e on w.id=e.wid 
group by a.id;
