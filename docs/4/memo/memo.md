# ツールバー

* 最初のページ：作品タイトル、前話リンク、今話数／全話数、目次、表示設定（フォントサイズ・ファミリ、縦横、白黒）
* 最後のページ：推し活リンク、次話リンク
* 途中のページ：現在ページ／全ページ

　作品のDBが必要。

# DB

* authors
	* works
		* episodes

```
https://domain.com/index.html
https://domain.com/author.html
https://domain.com/works/work-id.html
https://domain.com/works/work-id/episodes/episodes-id.html
https://domain.com/why-what-how.html
```

* webmention
* github pull-request
* ajax

## authors

　著者。

列|型|概要
--|--|----
`id`|`int`|
`name`|`string`|著者名（`<meta name="author">`）

## works

　作品。

列|型|概要
--|--|----
`id`|`int`|
`name`|`string`|作品名。作品タイトル（100字。副題は`: `で区切る）
`catch`|`string`|キャッチコピー（35字）
`description`|`string`|説明文（80字`<meta name="description">`）
`intro`|`string`|紹介文（800字（400字以降は`<!--more-->`））

## episodes

　一話分の本文。

列|型|概要
--|--|----
`id`|`int`|
`name`|`string`|
`created`|`datetime`|
`published`|`datetime`|
`updated`|`datetime`|
`chars`|`int`|文字数
`content`|`string`|

* エピソード＝2〜4千字程度の文章
* エピソード間の関係
	* リスト（作成日時順、作品の順序）
	* ツリー（一作品の一部分（一部・一章の一部分））
	* グラフ（任意の関係）

　エピソードは

* 著者の活動
	* 著者が作成した順
	* 著者が公開した順
	* 著者が更新した順
* 作品を読む
	* 作品の読むべき順
	* 作品と関係する物（順不同、関係別）
* 作品を選ぶ
	* 作品一覧
		* 小説
			* 一話完結
			* 挿話集
				* 挿話集の一話ごと
			* 短編
			* 中編
			* 長編
		* 詩
		* 短歌・川柳・俳句
		* エッセイ
		* 考察
		* 技術
			* ライティング
			* プログラミング
				* 調査・網羅・項目抽出・優先順位・意思決定
	* 短編集の


* Q&A（一問一答）
* スレッド（ひとつの話題について一言発言する。一発言400字、1000発言まで）
* チャット（1対1の対話形式スレッド）
* 一話完結（2〜4千字で一作品）
* 挿話集（一話完結が複数ある。目次から目的の話を見つけられて途中から読んでもいい。一話更新ごとに通知できる。）
* 短編（複数話で一作品。一章分くらい）
* 短編集（短編が複数で一作品）
* 中編
* 長編


* 記事
	* 話題A
		* 話1〜話N
	* 話題B


　作品開始ナビ（ヘッダ・フッタ）。

```
作品タイトル　全話︙　🏠
副題　　　　　Ｎ字　　⚙
```
```
Ⓜ＜114μ　💬＜N字　☝<N件　👥＜5K
次　Ｎ話（話タイトル）
```

SI|読み|10ⁿ|例
--|----|---|--
m|ミリ|10⁻³|`0.114=114m`
μ|マイクロ|10⁻⁶|`0.000114=114μ`

Ⓜ|概要
--|----
`1.114`|
`0.114`|
`0.0114`|
`0.00114`|
`0.00055`|最低

　作品中ナビ（フッタ）。

```
作品タイトル　今／全話︙　　🏠
副題　　　　　前話に戻る　　⚙
```

```
　　Ⓜ💬☝　　
前　今／全　次
```

　作品完了ナビ。

```
作品タイトル　今／全話︙　　🏠
副題　　　　　前話に戻る　　⚙
```
```
あとがき
```
```
　　Ⓜ💬☝　　
同一著者👤の作品一覧
```

### forewords

　まえがき。

列|型|概要
--|--|----
`id`|`int`|
`eid`|`int`|挿話ID

### postscripts

　あとがき。

列|型|概要
--|--|----
`id`|`int`|
`eid`|`int`|挿話ID


## totalling

　集計。

列|型|概要
--|--|----
`id`|`int`|
`eid`|`int`|



## addresses

　著者の連絡先。

列|型|概要
--|--|----
`id`|`int`|
`aid`|`int`|著者ID
`email`|`string`|
`github-username`|`string`|

　利用サービスごとに作る。

* id
* title




* works
	* id
	* episode

# ファイル

　DB作成は面倒。なので別案も考えてみる。mdファイル単位でナビ用リンクファイルを指定する。

```
---
author-id: 0
work-id: 1
prev-file-id: 1
next-file-id: 3
prev-episode-id: 1
next-episode-id: 3
self-contained: true（この文書だけで完結する内容であるか否か。真ならprevやnextがあってもタイトルや要約を紹介する）
topic-id: この文書が所属する話題ID
ref-work-ids: "関係性を説明するテキスト", [N, M, O, ...]
ref-file-ids: "関係性を説明するテキスト", [N, M, O, ...]
ref-topic-ids: "関係性を説明するテキスト", [N, M, O, ...]
monacoin-address: 
mastodon-mstdn.jp-username: 
github-username: 

created: 
published: 
updated: 

title: 
summary: 
description: 
---
```
```
https:/domain.com/authors/author-id.html
https:/domain.com/works/work-id.html
https:/domain.com/works/work-id/episodes/episodes-id.html
https:/domain.com/works/work-id/episodes/episodes-id-f.html
https:/domain.com/works/work-id/episodes/episodes-id-p.html
```

* メリット
	* ファイル単独で完結できる（DBがなくても動作するため軽量）
* デメリット
	* 集計が大変
	* 重複データが増える




* 必須
	* 作品を構成する文章を記したファイルとその正しい順序
* 任意
	* 著者の書いた他の作品
		* 関連性
			* 日時順
			* カテゴリ、タグ一致


　あとがきは必ず指定エピソードの最後に表示される。あとがき単独では見れないようにする。

# 構造

* services.db
* accounts.db
* authors/
	* author-id/
		* works/
			* work-id/
				* episodes/
					* episode-id.md
				* chapters.db
				* totalling.db
			* totalling.db
		* topics/
			* topic-id/
				* article-id.md
		* articles/
			* article-id.md
		* threads/
			* thread-id/
				* comment.md

	* totalling.db


* 作品
* 話題
* 記事
* 板

## services.db

## accounts.db

* 暗号資産(CryptoAssets)
	* monacoin.アドレス
* ActivityPub
	* Mastodon.インスタンス.ユーザ名
	* Misskey.インスタンス.ユーザ名
* Silo
	* GitHub
	* Twitter
* IPFS
	* Fleek

## authors


