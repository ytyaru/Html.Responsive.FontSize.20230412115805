(function() {
class Column {
    #size
    #count
    #page
    calc() {
        this.#count = (Size.client.inline < 1280) ? 1 : 2;
        Css.set('--column-count', `${this.#count}`)
        this.#calcPage()
        console.log(`Column count:${this.#count}, page:${this.#page}`)
        //this.#setBlankColumn()
    }
    get Count() { return this.#count; }
    get Page() { return this.#page; }
    #calcPage() { // column-gapなしで計算すればいい
        const GAP = Css.get('--column-gap')
        Css.set('--column-gap', `0em`)
        //WritingMode.resetSize()
        this.#calcPageNum()
        Css.set('--column-gap', GAP)
        //WritingMode.resetSize()
    }
    #calcPageNum() {
        const columnSize = Size.client.inline / this.Count
        console.log(`Size.target.scroll.inline: ${Size.target.scroll.inline}`)
        console.log(`columnSize: ${columnSize}`)
        console.log(`columnNum: ${Size.target.scroll.inline / columnSize}`)

        this.#page = Math.floor(Size.target.scroll.inline / Size.client.inline)
        console.log(Css.get('--column-gap'), this.#page, Size.target.scroll.inline, Size.client.inline)
        if (1===this.#count) { this.#setPadding(0); return; }
        const diff = Math.abs(Size.target.scroll.inline - (this.#page * Size.client.inline))
        //console.log(diff, Size.scroll.inline, (prePageSize + preGapSize), prePageSize, preGapSize, GAP)
        console.log(diff, Size.target.scroll.inline, (this.#page * Size.client.inline))
        if (diff < 5) { this.#setPadding(0); return; }
        else if (diff < Size.client.inline) {
            const addBlankColNum = Math.ceil(diff / (Size.client.inline / this.#count))
            this.#setPadding(addBlankColNum * Size.client.block)
            console.log('addNewPageNum:', addBlankColNum, addBlankColNum * Size.client.block)
            this.#setPadding(addBlankColNum * Size.client.block)
        } else { throw new Error('計算おかしいと思う') }
    }
    // padding-endが機能しない。たぶんJS APIのバグ
    //#setPadding(px) { document.querySelector('p:last-child').style.setProperty('padding-end', `${px}px`) }
    //#setPadding(px) { document.querySelector('p:last-child').style.setProperty(`padding-${(WritingMode.isHorizontal()) ? 'bottom' : 'right'}`, `${px}px`) }
    #setPadding(px) {
        if (WritingMode.isHorizontal()) {
            Css.set('--last-padding-bottom', `${px}px`)
            Css.set('--last-padding-right', `0px`)
        } else {
            Css.set('--last-padding-bottom', `0px`)
            Css.set('--last-padding-right', `${px}px`)
        }
    }
    /*
    #calcPage() {
        console.log(Size)
        const prePage = Size.scroll.inline / Size.client.inline
        this.#page = parseInt(prePage)
        if (1===this.#count) { return }
        const GAP = Css.getFloat('--column-gap') * Css.getFloat('--font-size')
        if (0===GAP) { return }
        if (1===this.#page) { return }
        const prePageSize = (parseInt(prePage) * (Size.client.inline))
        const preGapSize = (prePage-1) * GAP
        const diff = Math.abs(Size.scroll.inline - (prePageSize + preGapSize))
        console.log(diff, Size.scroll.inline, (prePageSize + preGapSize), prePageSize, preGapSize, GAP)
        if (diff < 5) { this.#page = parseInt(prePage) }
        else if (diff <= Size.client.inline) {
            const addBlankColNum = Math.ceil(diff / (Size.client.inline / this.#count))
            this.#setPadding(addBlankColNum * Size.client.block)
            console.log('addNewPageNum:', addBlankColNum)
            this.#page = parseInt(prePage) + 1
        } else { throw new Error('計算おかしいと思う') }
        // 既存バグ：ページ数が多くてGAP幅の合計がclient.inline以上のとき、ページ数を不当にインクリメントされてしまう
        // column-gapがclient.inlineに加算されてしまうため計算が面倒になっている。gapの仕様なので根本解決不能。
        // 再現しやすいのはスマホ。画面幅320pxでGAPが1em(16px)なら、20ページを超えた時に生じる。
        // 別解：paddingを使う。column-gapをやめてpaddingを使う。ただしcolumn-countで分割された数だけ増える。column-gapを再現するなら手間がかかる。
    }
    #setPadding(px) { document.querySelector('p:last-child').style.setProperty('padding-end', `${px}px`) }
    */
    /*
    #setBlankColumn() { // columnCount:2のとき偶数ページにする（右側に不足している空columnを追加する）
        if (1 === this.#count) { this.#setPadding(0); return; }
        const columnSize = Size.client.inline / this.#count
        const columnNum = Size.scroll.inline / columnSize
        const addColNum = columnNum % this.#count
        this.#page = parseInt(columnNum / this.#count)

        //const columnGapSize = Css.getFloat('--column-gap') * Css.getFloat('--font-size') * Math.max(0, this.#page - 1) * this.#page
        //console.assert(Size.scroll.inline===columnGapSize+(Size.client.inline*this.#page))
        //console.log(Size.scroll.inline, columnGapSize+(Size.client.inline*this.#page))
        //console.log(columnSize, columnNum, addColNum, this.#page)

        if (0 === addColNum) { this.#setPadding(0); return; }
        this.#page += 1
        console.assert(Size.scroll.inline===columnGapSize+(Size.client.inline*this.#page))
        console.log(Size.scroll.inline, columnGapSize+(Size.client.inline*this.#page))
        const addColSize = Size.client.block * addColNum
        this.#setPadding(addColSize)
        WritingMode.resetSize()
        Size = WritingMode.Size
        console.assert(Size.scroll.inline===columnGapSize+(Size.client.inline*this.#page))
        console.log(Size.scroll.inline, columnGapSize+(Size.client.inline*this.#page))
    }
    #setPadding(px) { document.querySelector('p:last-child').style.setProperty('padding-bottom', `${px}px`) }
    */
}
window.Column = new Column()
})()
