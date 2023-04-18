seq = (select count(*) from episodes where wid={{workId}})
insert into episodes values({{workId}}, {{seq}}, {{chars}}, '{{summary}}', '{{content}}');
