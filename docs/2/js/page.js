(function() {
class Page {
    #target
    set target(v) { if (Type.isDom(v)) { this.#target = v } }
    get Now() { return Size.target.scroll.start / this.#getAmount() }
    get All() { return Size.target.scroll.inline / this.#getAmount() }
//    calc(size) { Size = size }
//    next() { window.scrollBy(...this.#getSize()) }
    //next() { document.querySelector('main').scrollBy(...this.#getSize()) }
    next() { this.#target.scrollBy(...this.#getSize()) }
    //next() { if (!this.isLast()) { console.log(this.isLast(), this.#getSize()); window.scrollBy(...this.#getSize()); this.#now += 1; WritingMode.resetSize(); Size = WritingMode.Size; } }
    //prev() { document.querySelector('main').scrollBy(...this.#getSize(-1)) }
    prev() { this.#target.scrollBy(...this.#getSize(-1)) }
    //prev() { console.log(this.isFirst()); if (!this.isFirst()) { window.scrollBy(...this.#getSize(-1)); this.#now -= 1; WritingMode.resetSize(); Size = WritingMode.Size; } }
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
    isFirst() { return Size.target.scroll.start < Size.client.inline }
    isLast() { return (Size.target.scroll.inline - Size.client.inline) < Size.target.scroll.start }
    //#getStart() { return (WritingMode.isHorizontal()) ? window.scrollLeft : window.scrollTop }
    #getSize(c=1) { return (WritingMode.isHorizontal()) ? [this.#getAmount(c), 0] : [0, this.#getAmount(c)] }
    #getAmount(c=1) { return (Size.client.inline + this.#getGapSize()) * c }
    #getGapSize() { return Css.getFloat('--font-size') * Css.getFloat('--column-gap') }
}
window.Page = new Page()
})()
