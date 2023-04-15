(function() {
class WritingMode {
    #mode
    constructor() {
        this.Modes= Object.freeze({
            Horizontal: 'horizontal-tb',
            Vertical: 'vertical-rl',
        })
    }
    get Mode() { return this.#mode }
    set Mode(v) {
        if (this.#isValid(v) && this.#isChange(v)) {
            this.#mode = v
            switch(v) {
                case 'horizontal-tb': this.#setHorizontal(); break;
                case 'vertical-rl': this.#setVertical(); break;
                default: return;
            }
        }
    }
    isHorizontal() { return ('horizontal-tb'===this.#mode) }
    isVertical() { return ('vertical-rl'===this.#mode) }
    #getModeValues() { return Object.keys(this.Modes).map(k=>this.Modes[k]); }
    #error() { throw new Error(`writing-modeの値は次のいずれかのみ有効です。：${this.#getModeValues().toString()}`) }
    #isValid(id) { const v = this.#getModeValues().includes(id); if (!v) { this.#error() } return v;  }
    #isChange(id) { return id!==this.#mode }
    #setHorizontal() {
        Css.set('--writing-mode', 'horizontal-tb')
        Css.set('--text-orientation', 'unset')
        Css.set('--text-decoration', 'underline')
        Css.set('--inline-size', `${Size.target.scroll.inline}px`)
        Css.set('--block-size', `${Size.client.block}px`)
        Css.set('--scroll-snap-type-dir', 'x')
        Css.set('--overflow-x', 'scroll')
        Css.set('--overflow-y', 'hidden')
    }
    #setVertical() {
        Css.set('--writing-mode', 'vertical-rl')
        Css.set('--text-orientation', 'upright')
        Css.set('--text-decoration', 'overline')
        Css.set('--inline-size', `${Size.target.scroll.inline}px`)
        Css.set('--block-size', `${Size.client.block}px`)
        Css.set('--scroll-snap-type-dir', 'y')
        Css.set('--overflow-x', 'hidden')
        Css.set('--overflow-y', 'scroll')
    }
}
window.WritingMode = new WritingMode()
})()
