(function() {
class FontSize {
    #size
    #target
    #inlineSize
    #blockSize
    #fontSize
    calc() {
        if (Size.client.inline < 720) { Css.set('--column-count', '1'); Css.set(`--font-size`, '16px'); this.#fontSize=16; }
        else if (Size.client.inline  < 1024) { this.#setFontSize(1, 40) }
        else if (Size.client.inline < 1280) { this.#setFontSize(1, 45) }
        else if (Size.client.inline < 1920) { this.#setFontSize(2, 35) }
        else if (Size.client.inline < 2048) { this.#setFontSize(2, 40) }
        else { this.#setFontSize(2, 45) }
        this.#show()
    }
    #setFontSize(columnCount, lineOfChars) {
        Css.set('--column-count', `${columnCount}`)
        const LS = Css.getFloat('--letter-spacing')
        const G = Css.getFloat('--column-gap')
        const PS = Css.getFloat('--padding-inline-start')
        const PE = Css.getFloat('--padding-inline-end')
        this.#fontSize = (Size.client.inline) / (((lineOfChars + (lineOfChars * LS) + (PS + PE)) * columnCount) + (G * (columnCount-1)))
        console.log(columnCount, lineOfChars, LS, G, this.#fontSize)
        Css.set('--font-size', `${this.#fontSize}px`)
        return this.#fontSize
    }
    #show() {
        document.getElementById('devicePixelRatio').textContent = `${parseInt(devicePixelRatio * 100)}%`
        document.getElementById('fontSize').textContent = `${this.#fontSize}`
        //document.getElementById('page').textContent = `${Column.Page}`
        document.getElementById('page').textContent = `${Page.All}`
        document.getElementById('screenInline').textContent = `${Size.screen.inline}`
        document.getElementById('screenBlock').textContent = `${Size.screen.block}`
        document.getElementById('availInline').textContent = `${Size.avail.inline}`
        document.getElementById('availBlock').textContent = `${Size.avail.block}`
        document.getElementById('outerInline').textContent = `${Size.outer.inline}`
        document.getElementById('outerBlock').textContent = `${Size.outer.block}`
        document.getElementById('innerInline').textContent = `${Size.inner.inline}`
        document.getElementById('innerBlock').textContent = `${Size.inner.block}`
        document.getElementById('clientInline').textContent = `${Size.client.inline}`
        document.getElementById('clientBlock').textContent = `${Size.client.block}`
        document.getElementById('scrollbarInline').textContent = `${Size.scrollbar.inline}`
        document.getElementById('scrollbarBlock').textContent = `${Size.scrollbar.block}`
        document.getElementById('scrollInline').textContent = `${Size.target.scroll.inline}`
        document.getElementById('scrollStart').textContent = `${Size.target.scroll.start}`
//        document.getElementById('scrollInline').textContent = `${Size.scroll.inline}`
//        document.getElementById('scrollStart').textContent = `${Size.scroll.start}`
    }
    /*
    init(el) {
        //if (this.resizeObserver) { return }
        this.#target = (el) ? el : document.body
        this.resizeObserver = new ResizeObserver(entries => { this.reset() })
        this.resizeObserver.observe(this.#target);
        WritingMode.Target = el
    }
    reset() {
        WritingMode.resetSize()
        Size = WritingMode.Size
        Column.calc(Size)
        Page.calc(Size)
        //Css.set('--block-size', `${Size.client.block}px`)
        //const sideSize = [...document.querySelectorAll('header, footer')].map(el=>Css.getFloat('block-size', el)).reduce((sum, v)=>sum+v, 0)
        const sideSize = [...document.querySelectorAll('header')].map(el=>Css.getFloat('block-size', el)).reduce((sum, v)=>sum+v, 0)
        Css.set('--block-size', `${Size.client.block - sideSize}px`)
        this.setfontSize()
        this.#show()
    }
    setfontSize() {
        if (Size.client.inline < 720) { Css.set('--column-count', '1'); Css.set(`--font-size`, '16px'); this.#fontSize=16; }
        else if (Size.client.inline  < 1024) { this.#setFontSize(1, 40) }
        else if (Size.client.inline < 1280) { this.#setFontSize(1, 45) }
        else if (Size.client.inline < 1920) { this.#setFontSize(2, 35) }
        else if (Size.client.inline < 2048) { this.#setFontSize(2, 40) }
        else { this.#setFontSize(2, 45) }
    }
    #setFontSize(columnCount, lineOfChars) {
        Css.set('--column-count', `${columnCount}`)
        const LS = Css.getFloat('--letter-spacing')
        const G = Css.getFloat('--column-gap')
        const PS = Css.getFloat('--padding-inline-start')
        const PE = Css.getFloat('--padding-inline-end')
        this.#fontSize = (Size.client.inline) / (((lineOfChars + (lineOfChars * LS) + (PS + PE)) * columnCount) + (G * (columnCount-1)))
        //this.#fontSize = Math.max(16, (Size.client.inline) / (((lineOfChars + (lineOfChars * LS) + (PS + PE)) * columnCount) + (G * (columnCount-1))))
        //this.#fontSize = Math.max(16, (Size.client.inline / devicePixelRatio) / (((lineOfChars + (lineOfChars * LS) + (PS + PE)) * columnCount) + (G * (columnCount-1))))
        //this.#fontSize = (Size.client.inline / devicePixelRatio) / (((lineOfChars + (lineOfChars * LS) + (PS + PE)) * columnCount) + (G * (columnCount-1)))
        console.log(columnCount, lineOfChars, LS, G, this.#fontSize)
        Css.set('--font-size', `${this.#fontSize}px`)
        //Css.set('--font-size', `16px`)
        return this.#fontSize
    }
    #show() {
        document.getElementById('devicePixelRatio').textContent = `${parseInt(devicePixelRatio * 100)}%`
        document.getElementById('fontSize').textContent = `${this.#fontSize}`
        document.getElementById('page').textContent = `${Column.Page}`
        document.getElementById('screenInline').textContent = `${Size.screen.inline}`
        document.getElementById('screenBlock').textContent = `${Size.screen.block}`
        document.getElementById('availInline').textContent = `${Size.avail.inline}`
        document.getElementById('availBlock').textContent = `${Size.avail.block}`
        document.getElementById('outerInline').textContent = `${Size.outer.inline}`
        document.getElementById('outerBlock').textContent = `${Size.outer.block}`
        document.getElementById('innerInline').textContent = `${Size.inner.inline}`
        document.getElementById('innerBlock').textContent = `${Size.inner.block}`
        document.getElementById('clientInline').textContent = `${Size.client.inline}`
        document.getElementById('clientBlock').textContent = `${Size.client.block}`
        document.getElementById('scrollbarInline').textContent = `${Size.scrollbar.inline}`
        document.getElementById('scrollbarBlock').textContent = `${Size.scrollbar.block}`
        document.getElementById('scrollInline').textContent = `${Size.scroll.inline}`
        document.getElementById('scrollStart').textContent = `${Size.scroll.start}`
    }
    */
}
window.FontSize = new FontSize()
})();
