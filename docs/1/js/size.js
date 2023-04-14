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
    set Target(v) { 
        this.#target = document.querySelector('main') || document.body
    set WritingMode(v) {

    }
    set ColumnCount(v) {

    }
    set LineOfChars(v) {

    }
    capture() {

    }
    calc(writingMode, columnCount, lineOfChars) {

    }
}
window.Size = new Size()
})()


