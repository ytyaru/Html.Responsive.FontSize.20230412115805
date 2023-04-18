-- 既存の挿話を別のseqに変更する
-- 引数：
--   from: 移動する挿話のseq
--   to: 移動先のseq
BEGIN TRANSACTION move_episode
update episodes set seq={{to}} where wid={{workId}} and seq={{from}}
seq = (select count(*) from episodes where wid={{workId}})
insert into episodes values({{workId}}, {{seq}}, {{chars}}, '{{summary}}', '{{content}}');
COMMIT TRANSACTION move_episode

