create table beats {
    id integer primary key not null,
    wid integer references works(id) not null check(0<=level),
    seq integer not null check(0<=level), -- 順序(0=作品, 1〜=1話〜)
    level integer not null default 0 check(0<=level), -- 0=話, 1=章, 2=部
    title text not null check(0<length(title) and length(title)<=100), -- タイトル
    catch text not null default '' check(0<=length(catch) and length(catch)<=35), -- キャッチコピー、ピッチ
    logline text not null default '' check(0<=length(logline) and length(logline)<=100), -- 誰が何してどう変わるか
    synopsis text not null default '' check(0<=length(synopsis) and length(synopsis)<=100), -- あらすじ
    hook text not null default '' check(0<=length(hook) and length(hook)<=100), -- つかみ
    central_question not null default '' check(0<=length(central_question) and length(central_question)<=100), -- 
    opening_image text not null default '' check(0<=length(opening_image) and length(opening_image)<=100), -- ｵｰﾌﾟﾆﾝｸﾞ･ｲﾒｰｼﾞ 1%
    theme_stated text not null default '' check(0<=length() and length()<=100), -- テーマの提示 5%
    setup text not null default '' check(0<=length() and length()<=100), -- セットアップ 1-10%
    catalyst text not null default '' check(0<=length() and length()<=100), -- きっかけ 10%
    debate text not null default '' check(0<=length() and length()<=100), -- 悩みの時 10-20%
    break_into_two text not null default '' check(0<=length() and length()<=100), -- ターニングポイント１ 20%
    b_story text not null default '' check(0<=length() and length()<=100), -- サブプロット 25%
    fun_and_games text not null default '' check(0<=length() and length()<=100), -- お楽しみ 25-50% ピンチ1
    midpoint text not null default '' check(0<=length() and length()<=100), -- ミッドポイント 50%
    bad_guys_close In text not null default '' check(0<=length() and length()<=100), -- 迫りくる悪い奴ら 50-70%
    all_is_lost text not null default '' check(0<=length() and length()<=100), -- すべてを失って 70%
    dark_night_of_the_soul text not null default '' check(0<=length() and length()<=100), -- 心の暗闇 70-80%
    break_into_three text not null default '' check(0<=length() and length()<=100), -- ターニングポイント２ 80%
    finale text not null default '' check(0<=length() and length()<=100), -- フィナーレ 80-100% (Gather the team（チームをまとめる）,Execute the plan（計画を実行する）,High tower surprise（思わぬ障害）,Dig deep down（深く掘り下げ自分の中に眠る答えを見つける。テーマを学んだ証明）,Execute a new plan（新計画の実行）)
    final_image text not null default '' check(0<=length() and length()<=100), -- ファイナル・イメージ 100%
    unique(wid, seq, level)
}
