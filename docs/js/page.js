(function() {
class Page {
    #size
    #now=1
    calc(size) { this.#size = size }
//    next() { window.scrollBy(...this.#getSize()) }
    next() { document.querySelector('main').scrollBy(...this.#getSize()) }
    //next() { if (!this.isLast()) { console.log(this.isLast(), this.#getSize()); window.scrollBy(...this.#getSize()); this.#now += 1; WritingMode.resetSize(); this.#size = WritingMode.Size; } }
    prev() { document.querySelector('main').scrollBy(...this.#getSize(-1)) }
    //prev() { console.log(this.isFirst()); if (!this.isFirst()) { window.scrollBy(...this.#getSize(-1)); this.#now -= 1; WritingMode.resetSize(); this.#size = WritingMode.Size; } }
    setupKeyEvent() {
        window.addEventListener('keyup', (e)=>this.#keyEvent(e))
        document.querySelector('main').addEventListener('keyup', (e)=>this.#keyEvent(e))
        /*
        window.addEventListener('keyup', (e) => {
                 if (e.shiftKey && 'Enter'===e.key) { this.prev() }
            else if (              'Enter'===e.key) { this.next() }
            else if (e.shiftKey && ' '===e.key) { this.prev() }
            else if (              ' '===e.key) { this.next() }
        })
        */
    }
    #keyEvent(e) {
        console.log(e)
             if (e.shiftKey && 'Enter'===e.key) { this.prev() }
        else if (              'Enter'===e.key) { this.next() }
        else if (e.shiftKey && ' '===e.key) { this.prev() }
        else if (              ' '===e.key) { this.next() }
    }
    isFirst() { return this.#size.scroll.start < this.#size.client.inline }
    isLast() { return (this.#size.scroll.inline - this.#size.client.inline) < this.#size.scroll.start }
    #getStart() { return (WritingMode.isHorizontal()) ? window.scrollLeft : window.scrollTop }
    #getSize(c=1) { return (WritingMode.isHorizontal()) ? [this.#getAmount(c), 0] : [0, this.#getAmount(c)] }
    #getAmount(c=1) { return (this.#size.client.inline + Css.getFloat('--font-size') * Css.getFloat('--column-gap')) * c }
}
window.Page = new Page()
})()
