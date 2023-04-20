create table beats {
    id integer primary key not null,
    wid integer references works(id) not null check(0<=level),
    seq integer not null check(0<=level), -- 順序(0=作品, 1〜=1話〜)
    level integer not null default 0 check(0<=level), -- 0=話, 1=章, 2=部
    title text not null check(0<length(title) and length(title)<=100), -- タイトル
    catch text not null default '' check(0<=length(catch) and length(catch)<=35), -- キャッチコピー、ピッチ
    logline text not null default '' check(0<=length(logline) and length(logline)<=100), -- 誰が何してどう変わるか
    -- [静止=死]の危機に瀕している、[欠陥のある主人公]は[B2で新しい世界に飛び込みます]が、[MPで起きた事件]により、[全てを失い]、[テーマ]を学びます。
    synopsis text not null default '' check(0<=length(synopsis) and length(synopsis)<=100), -- あらすじ
    hook text not null default '' check(0<=length(hook) and length(hook)<=100), -- つかみ
    central_question not null default '' check(0<=length(central_question) and length(central_question)<=100), -- 解決すべき課題
    opening_image text not null default '' check(0<=length(opening_image) and length(opening_image)<=100), -- ｵｰﾌﾟﾆﾝｸﾞ･ｲﾒｰｼﾞ 1%
    theme_stated text not null default '' check(0<=length() and length()<=100), -- テーマの提示 5%
    setup text not null default '' check(0<=length() and length()<=100), -- セットアップ 1-10% stasis=death
    setup_home text not null default '' check(0<=length() and length()<=100), -- セットアップ 家   1-10%
    setup_work text not null default '' check(0<=length() and length()<=100), -- セットアップ 仕事 1-10%
    setup_play text not null default '' check(0<=length() and length()<=100), -- セットアップ 遊び 1-10%
    catalyst text not null default '' check(0<=length() and length()<=100), -- きっかけ 10%
    debate text not null default '' check(0<=length() and length()<=100), -- 悩みの時 10-20%
    debate_home text not null default '' check(0<=length() and length()<=100), -- 悩みの時 10-20%
    debate_work text not null default '' check(0<=length() and length()<=100), -- 悩みの時 10-20%
    debate_play text not null default '' check(0<=length() and length()<=100), -- 悩みの時 10-20%
    break_into_two text not null default '' check(0<=length() and length()<=100), -- ターニングポイント１ 20%
    break_into_two_hero_want text not null default '' check(0<=length() and length()<=100), -- ターニングポイント１ 20%
    break_into_two_problem text not null default '' check(0<=length() and length()<=100), -- ターニングポイント１ 20%
    b_story text not null default '' check(0<=length() and length()<=100), -- サブプロット 25% internal
    fun_and_games text not null default '' check(0<=length() and length()<=100), -- お楽しみ 25-50% ピンチ1 external
    midpoint text not null default '' check(0<=length() and length()<=100), -- ミッドポイント 50%
    midpoint_is_false_victory integer not null default 1 check(0=midpoint_is_false_victory or 1=midpoint_is_false_victory), -- MP(false-victory)->BadGuysClose(Despair)->AllIsLost, MP(false-defert)->BadGuysClose(Hope)->AllIsLost
    bad_guys_close In text not null default '' check(0<=length() and length()<=100), -- 迫りくる悪い奴ら 50-70%
    all_is_lost text not null default '' check(0<=length() and length()<=100), -- すべてを失って 70%
    dark_night_of_the_soul text not null default '' check(0<=length() and length()<=100), -- 心の暗闇 70-80%
    dark_night_of_the_soul_home text not null default '' check(0<=length() and length()<=100), -- 心の暗闇 70-80%
    dark_night_of_the_soul_work text not null default '' check(0<=length() and length()<=100), -- 心の暗闇 70-80%
    dark_night_of_the_soul_play text not null default '' check(0<=length() and length()<=100), -- 心の暗闇 70-80%
    break_into_three text not null default '' check(0<=length() and length()<=100), -- ターニングポイント２ 80%
    break_into_three_hero_need text not null default '' check(0<=length() and length()<=100), -- ターニングポイント２ 80%
    finale text not null default '' check(0<=length() and length()<=100), -- フィナーレ 80-100% (Gather the team（チームをまとめる）,Execute the plan（計画を実行する）,High tower surprise（思わぬ障害）,Dig deep down（深く掘り下げ自分の中に眠る答えを見つける。テーマを学んだ証明）,Execute a new plan（新計画の実行）)
    gather_the_team text not null default '' check(0<=length(gather_the_team) and length(gather_the_team)<=100), -- チームをまとめる
    gather_the_team_is_theam_assembles text not null default 1 check(0=), -- 1:チームが組み立つ(theam assembles), 0:主人公が見捨てられる(theam abandons hero)。StormingTheCastle(1:Despire, 0:Hope)
    storming_the_castle text not null default '' check(0<=length(storming_the_castle) and length(storming_the_castle)<=100), -- 計画を実行する
    hightower_surprise text not null default '' check(0<=length(hightower_surprise) and length(hightower_surprise)<=100), -- 思わぬ障害
    dig_deep_down text not null default '' check(0<=length(dig_deep_down) and length(dig_deep_down)<=100), -- 深く掘り下げる（テーマを学んだ証）
    execute_new_plan text not null default '' check(0<=length() and length()<=100), -- 新プランの実行
    final_image text not null default '' check(0<=length() and length()<=100), -- ファイナル・イメージ 100%
    final_image_is_changed_hero integer not null default 1 check(0=final_image_is_changed_hero or 1=final_image_is_changed_hero), -- 1:HeroIsChanged(HappyEnd), 0:HeroRejectsChange(BadEnd)
    unique(wid, seq, level)
}
