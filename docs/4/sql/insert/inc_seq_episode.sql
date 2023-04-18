-- 既存の挿話seqをインクリメントして入れ替える
-- 引数：
--   targetId: seqをインクリメントする挿話ID
BEGIN TRANSACTION inc_seq_episode
if (max(seq) <= targetId) { throw new Error('末尾のseqはインクリメントできません。それより前のseqにしてください。') }
-- episodes
workId = (select wid from episodes where id={{targetId}});
targetSeq = (select seq from episodes where id={{targetId}}));
nextId = (select id from episodes where seq={{targetSeq+1}} and wid={{workId}});
update episodes set seq={{targetSeq+1}} where id={{targetId}};
update episodes set seq={{targetSeq-1}} where id={{nextId}});
-- chapters
targetIds = (select id from chapters where seq={{targetSeq}} and wid={{workId}});
nextIds = (select id from chapters where seq={{targetSeq+1}} and wid={{workId}});
for (let t of targetIds) {
    update chapters set seq={{targetSeq+1}} where id={{t}};
}
for (let n of nextIds) {
    update chapters set seq={{targetSeq-1}} where id={{n}};
}
COMMIT TRANSACTION inc_seq_episode

