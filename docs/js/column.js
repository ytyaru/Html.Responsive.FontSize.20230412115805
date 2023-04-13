(function() {
class Column {
    #size
    #count
    #page
    calc(size) {
        this.#size = size
        console.log(size)
        this.#count = (size.client.inline < 1280) ? 1 : 2;
        this.#setBlankColumn()
    }
    get Count() { return this.#count; }
    get Page() { return this.#page; }
    #setBlankColumn() { // columnCount:2のとき偶数ページにする（右側に不足している空columnを追加する）
        if (1 === this.#count) { this.#setPadding(0); return; }
        const columnSize = this.#size.client.inline / this.#count
        const columnNum = this.#size.scroll.inline / columnSize
        const addColNum = columnNum % this.#count
        this.#page = parseInt(columnNum / this.#count)
        console.log(columnSize, columnNum, addColNum, this.#page)
        if (0 === addColNum) { this.#setPadding(0); return; }
        this.#page += 1
        const addColSize = this.#size.client.block * addColNum
        this.#setPadding(addColSize)
    }
    #setPadding(px) { document.querySelector('p:last-child').style.setProperty('padding-bottom', `${px}px`) }
}
window.Column = new Column()
})()
