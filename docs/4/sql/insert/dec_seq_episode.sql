-- 既存の挿話seqをデクリメントして入れ替える
-- 引数：
--   targetId: seqをデクリメントする挿話ID
BEGIN TRANSACTION dec_seq_episode
if (targetId <= min(seq)) { throw new Error('先頭のseqはデクリメントできません。それより後のseqにしてください。') }
-- episodes
workId = (select wid from episodes where id={{targetId}});
targetSeq = (select seq from episodes where id={{targetId}});
prevId = (select id from episodes where seq={{targetSeq-1}} and wid={{workId}};
prevSeq = (select seq from episodes where seq={{prevSeq}} and wid={{workId}};
update episodes set seq={{targetSeq-1}} where id={{targetId}};
update episodes set seq={{prevSeq+1}} where wid={{prevId}} and wid={{workId}};
-- chapters
targetIds = (select id from chapters where seq={{targetSeq}} and wid={{workId}});
prevIds = (select id from chapters where seq={{targetSeq-1}} and wid={{workId}});
for (let t of targetIds) {
    update chapters set seq={{t-1}} where id={{t}} and wid={{workId}};
}
for (let p of prevIds) {
    update chapters set seq={{p+1}} where wid={{p}} and wid={{workId}};
}
COMMIT TRANSACTION dec_seq_episode

