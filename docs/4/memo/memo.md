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
`name`|`string`|

## works

　作品。

列|型|概要
--|--|----
`id`|`int`|
`name`|`string`|

## episodes

　一話分の本文。

列|型|概要
--|--|----
`id`|`int`|
`name`|`string`|
`content`|`string`|
`created`|`datetime`|
`published`|`datetime`|
`updated`|`datetime`|
`chars`|`int`|

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

