(function() {
class Size {
    #target
    constructor() {
        this.#target = document.querySelector('main') || document.body
        this.#size = {
            screen: { inline:0, block:0 }, // 画面
            avail: { inline:0, block:0 },  // タスクバー除く画面
            outer: { inline:0, block:0 },  // ブラウザ全体の外周
            inner: { inline:0, block:0 },  // ブラウザ内周
            client: { inline:0, block:0 }, // ブラウザ内の表示領域（スクロールバー除く）
            scrollbar: { inline:0, block:0 }, // スクロールバー
            scroll: { inline:0, start:0, size:0 },
            target: {
                client: { inline:0, block:0 },
                scroll: { inline:0, start:0, size:0 },
            }
        }
        this.Modes= Object.freeze({
            Horizontal: 'horizontal-tb',
            Vertical: 'vertical-rl',
        })
        this.Mode = this.Modes.Horizontal
    }
    get Size() { return Object.freeze(this.#deepCopy(this.#size)) }
    #deepCopy(obj) { return JSON.parse(JSON.stringify(obj)); } // structuredClone()未実装のため
    set Target(v) { 
        this.#target = document.querySelector('main') || document.body
        WritingMode.Mode = v
        if (WritingMode.isHozirontal()) { this.#setSizeHorizontal() }
        else { this.#setSizeVertical() }
    }
    set ColumnCount(v) {

    }
    set LineOfChars(v) {

    }
    capture() {

    }
    calc(writingMode, columnCount, lineOfChars) {

    }
    #setSizeHorizontal() {
        this.#size.screen.inline = screen.width;
        this.#size.screen.block = screen.height;
        this.#size.avail.inline = screen.availWidth;
        this.#size.avail.block = screen.availHeight;
        this.#size.outer.inline = window.outerWidth;
        this.#size.outer.block = window.outerHeight;
        this.#size.inner.inline = window.innerWidth;
        this.#size.inner.block = window.innerHeight;
        this.#size.client.inline = document.documentElement.clientWidth;
        this.#size.client.block = document.documentElement.clientHeight;
        this.#size.scrollbar.inline = this.#size.inner.inline - this.#size.client.inline;
        this.#size.scrollbar.block = this.#size.inner.block - this.#size.client.block;
        this.#size.scroll.inline = document.documentElement.scrollWidth
        this.#size.scroll.start = document.documentElement.scrollLeft
        if (this.#target) {
            this.#size.target.client.inline = this.#target.clientWidth
            this.#size.target.client.block = this.#target.clientHeight
            this.#size.target.scroll.inline = this.#target.scrollWidth
            this.#size.target.scroll.start = this.#target.scrollLeft
        }
        console.log(this.#size)
        console.log(this.#target)
    }
    #setSizeVertical() {
        this.#size.screen.inline = screen.height;
        this.#size.screen.block = screen.width;
        this.#size.avail.inline = screen.availHeight;
        this.#size.avail.block = screen.availWidth;
        this.#size.outer.inline = window.outerHeight;
        this.#size.outer.block = window.outerWidth;
        this.#size.inner.inline = window.innerWidth;
        this.#size.inner.block = window.innerWidth;
        this.#size.client.inline = document.documentElement.clientHeight;
        this.#size.client.block = document.documentElement.clientWidth;
        this.#size.scrollbar.inline = this.#size.inner.inline - this.#size.client.inline;
        this.#size.scrollbar.block = this.#size.inner.block - this.#size.client.block;
        this.#size.scroll.inline = document.documentElement.scrollHeight
        this.#size.scroll.start = document.documentElement.scrollTop
        if (this.#target) {
            this.#size.target.client.inline = this.#target.clientHeight
            this.#size.target.client.block = this.#target.clientWidth
            this.#size.target.scroll.inline = this.#target.scrollHeight
            this.#size.target.scroll.start = this.#target.scrollTop
        }
        console.log(this.#size)
        console.log(this.#target)
    }

}
class WiringModeArea {
    constructor() { this.inline=0, this.block=0, this.start=0, this.end=0 }
    constructor() { [this.inline, this.block, this.start, this.end] = [0,0,0,0] }
}
window.Size = new Size()
})()


