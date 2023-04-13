(function() {
class FontSize {
    #size
    #target
    #inlineSize
    #blockSize
    #fontSize
    init(el) {
        //if (this.resizeObserver) { return }
        this.#target = (el) ? el : document.body
        this.resizeObserver = new ResizeObserver(entries => { this.reset() })
        this.resizeObserver.observe(this.#target);
    }
    reset() {
        WritingMode.resetSize()
        this.#size = WritingMode.Size
        Column.calc(this.#size)
        Page.calc(this.#size)
        //Css.set('--block-size', `${this.#size.client.block}px`)
        //const sideSize = [...document.querySelectorAll('header, footer')].map(el=>Css.getFloat('block-size', el)).reduce((sum, v)=>sum+v, 0)
        const sideSize = [...document.querySelectorAll('header')].map(el=>Css.getFloat('block-size', el)).reduce((sum, v)=>sum+v, 0)
        Css.set('--block-size', `${this.#size.client.block - sideSize}px`)
        /*
        */
        this.setfontSize()
        this.#show()
    }
    setfontSize() {
        if (this.#size.client.inline < 720) { Css.set('--column-count', '1'); Css.set(`--font-size`, '16px'); }
        else if (this.#size.client.inline  < 1024) { this.#setFontSize(1, 40) }
        else if (this.#size.client.inline < 1280) { this.#setFontSize(1, 45) }
        else if (this.#size.client.inline < 1920) { this.#setFontSize(2, 35) }
        else if (this.#size.client.inline < 2048) { this.#setFontSize(2, 40) }
        else { this.#setFontSize(2, 45) }
    }
    #setFontSize(columnCount, lineOfChars) {
        Css.set('--column-count', `${columnCount}`)
        const LS = Css.getFloat('--letter-spacing')
        const G = Css.getFloat('--column-gap')
        const PS = Css.getFloat('--padding-inline-start')
        const PE = Css.getFloat('--padding-inline-end')
        this.#fontSize = (this.#size.client.inline / devicePixelRatio) / (((lineOfChars + (lineOfChars * LS) + (PS + PE)) * columnCount) + (G * (columnCount-1)))
        console.log(columnCount, lineOfChars, LS, G, this.#fontSize)
        Css.set('--font-size', `${this.#fontSize}px`)
        //Css.set('--font-size', `16px`)
        return this.#fontSize
    }
    #show() {
        document.getElementById('devicePixelRatio').textContent = `${parseInt(devicePixelRatio * 100)}%`
        document.getElementById('fontSize').textContent = `${this.#fontSize}`
        document.getElementById('page').textContent = `${Column.Page}`
        document.getElementById('screenInline').textContent = `${this.#size.screen.inline}`
        document.getElementById('screenBlock').textContent = `${this.#size.screen.block}`
        document.getElementById('availInline').textContent = `${this.#size.avail.inline}`
        document.getElementById('availBlock').textContent = `${this.#size.avail.block}`
        document.getElementById('outerInline').textContent = `${this.#size.outer.inline}`
        document.getElementById('outerBlock').textContent = `${this.#size.outer.block}`
        document.getElementById('innerInline').textContent = `${this.#size.inner.inline}`
        document.getElementById('innerBlock').textContent = `${this.#size.inner.block}`
        document.getElementById('clientInline').textContent = `${this.#size.client.inline}`
        document.getElementById('clientBlock').textContent = `${this.#size.client.block}`
        document.getElementById('scrollbarInline').textContent = `${this.#size.scrollbar.inline}`
        document.getElementById('scrollbarBlock').textContent = `${this.#size.scrollbar.block}`
        document.getElementById('scrollInline').textContent = `${this.#size.scroll.inline}`
        document.getElementById('scrollStart').textContent = `${this.#size.scroll.start}`
        /*
        document.getElementById('devicePixelRatio').textContent = `${parseInt(devicePixelRatio * 100)}%`
        document.getElementById('fontSize').textContent = `${parseInt(devicePixelRatio * 100)}%`
        document.getElementById('inlineSize').textContent = `${this.#inlineSize}`
        document.getElementById('blockSize').textContent = `${this.#blockSize}`
        document.getElementById('screenWidth').textContent = `${screen.width}`
        document.getElementById('screenHeight').textContent = `${screen.height}`
        document.getElementById('clientWidth').textContent = `${document.body.clientWidth}`
        document.getElementById('clientHeight').textContent = `${document.documentElement.clientHeight}`
        document.getElementById('innerWidth').textContent = `${window.innerWidth}`
        document.getElementById('innerHeight').textContent = `${window.innerHeight}`
        const inlineInnerSize = 
        document.getElementById('scrollbarWidth').textContent = `${window.innerWidth - document.body.clientWidth}`
        document.getElementById('scrollbarHeight').textContent = `${window.innerHeight - document.documentElement.clientHeight}`
        */
    }
}
window.FontSize = new FontSize()
})();
