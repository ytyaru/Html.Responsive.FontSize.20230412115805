(function() {
class Page {
    #size
    calc(size) { this.#size = size }
    next() { window.scrollBy(...this.#getSize()) }
    prev() { window.scrollBy(...this.#getSize(-1)) }
    setupKeyEvent() {
        window.addEventListener('keyup', (e) => {
                 if (e.shiftKey && 'Enter'===e.key) { this.prev() }
            else if (              'Enter'===e.key) { this.next() }
            else if (e.shiftKey && ' '===e.key) { this.prev() }
            else if (              ' '===e.key) { this.next() }
        })
    }
    isFirst() { return this.#size.scroll.start < this.#size.client.inline }
    isLast() {}
    #getStart() { return (WritingMode.isHorizontal()) ? window.scrollLeft : window.scrollTop }
    #getSize(c=1) { return (WritingMode.isHorizontal()) ? [this.#getAmount(c), 0] : [0, this.#getAmount(c)] }
    #getAmount(c=1) { return (this.#size.client.inline + Css.getFloat('--font-size') * Css.getFloat('--column-gap')) * c }
}
window.Page = new Page()
})()
