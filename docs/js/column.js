(function() {
class Column {
    #size
    #count
    #page
    calc(size) {
        this.#size = size
        console.log(size)
        this.#count = (size.client.inline < 1280) ? 1 : 2;
        this.#calcPage()
        //this.#setBlankColumn()
    }
    get Count() { return this.#count; }
    get Page() { return this.#page; }
    #calcPage() {
        console.log(this.#size)
        const prePage = this.#size.scroll.inline / this.#size.client.inline
        this.#page = parseInt(prePage)
        if (1===this.#count) { return }
        const GAP = Css.getFloat('--column-gap') * Css.getFloat('--font-size')
        if (0===GAP) { return }
        if (1===this.#page) { return }
        const prePageSize = (parseInt(prePage) * (this.#size.client.inline))
        const preGapSize = (prePage-1) * GAP
        const diff = Math.abs(this.#size.scroll.inline - (prePageSize + preGapSize))
        console.log(diff, this.#size.scroll.inline, (prePageSize + preGapSize), prePageSize, preGapSize, GAP)
        if (diff < 5) { this.#page = parseInt(prePage) }
        else if (diff <= this.#size.client.inline) {
            const addBlankColNum = Math.ceil(diff / (this.#size.client.inline / this.#count))
            this.#setPadding(addBlankColNum * this.#size.client.block)
            console.log('addNewPageNum:', addBlankColNum)
            this.#page = parseInt(prePage) + 1
        } else { throw new Error('計算おかしいと思う') }
        // 既存バグ：ページ数が多くてGAP幅の合計がclient.inline以上のとき、ページ数を不当にインクリメントされてしまう
        // column-gapがclient.inlineに加算されてしまうため計算が面倒になっている。gapの仕様なので根本解決不能。
        // 再現しやすいのはスマホ。画面幅320pxでGAPが1em(16px)なら、20ページを超えた時に生じる。
        // 別解：paddingを使う。column-gapをやめてpaddingを使う。ただしcolumn-countで分割された数だけ増える。column-gapを再現するなら手間がかかる。
    }
    #setPadding(px) { document.querySelector('p:last-child').style.setProperty('padding-end', `${px}px`) }
    /*
    #setBlankColumn() { // columnCount:2のとき偶数ページにする（右側に不足している空columnを追加する）
        if (1 === this.#count) { this.#setPadding(0); return; }
        const columnSize = this.#size.client.inline / this.#count
        const columnNum = this.#size.scroll.inline / columnSize
        const addColNum = columnNum % this.#count
        this.#page = parseInt(columnNum / this.#count)

        //const columnGapSize = Css.getFloat('--column-gap') * Css.getFloat('--font-size') * Math.max(0, this.#page - 1) * this.#page
        //console.assert(this.#size.scroll.inline===columnGapSize+(this.#size.client.inline*this.#page))
        //console.log(this.#size.scroll.inline, columnGapSize+(this.#size.client.inline*this.#page))
        //console.log(columnSize, columnNum, addColNum, this.#page)

        if (0 === addColNum) { this.#setPadding(0); return; }
        this.#page += 1
        console.assert(this.#size.scroll.inline===columnGapSize+(this.#size.client.inline*this.#page))
        console.log(this.#size.scroll.inline, columnGapSize+(this.#size.client.inline*this.#page))
        const addColSize = this.#size.client.block * addColNum
        this.#setPadding(addColSize)
        WritingMode.resetSize()
        this.#size = WritingMode.Size
        console.assert(this.#size.scroll.inline===columnGapSize+(this.#size.client.inline*this.#page))
        console.log(this.#size.scroll.inline, columnGapSize+(this.#size.client.inline*this.#page))
    }
    #setPadding(px) { document.querySelector('p:last-child').style.setProperty('padding-bottom', `${px}px`) }
    */
}
window.Column = new Column()
})()
