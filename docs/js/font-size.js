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
    }
}
window.FontSize = new FontSize()
})();
