(function() {
class Page {
    #target
    set target(v) { if (Type.isDom(v)) { this.#target = v } }
    get Now() { return Math.ceil(Size.target.scroll.start / this.#getAmount())+1 }
    get All() { return Math.ceil(Size.target.scroll.inline / this.#getAmount()) }
    next() { this.#target.scrollBy(...this.#getSize()); console.log(`page: ${this.Now}/${this.All}`); }
    prev() { this.#target.scrollBy(...this.#getSize(-1)); console.log(`page: ${this.Now}/${this.All}`); }
    first() { console.log('Page.first()'); this.#target.scrollTo(...this.#getSize(0)) }
    last() { this.#target.scrollTo(...this.#getSize(this.All)) }
    setupKeyEvent() {
        window.addEventListener('keyup', (e)=>this.#keyEvent(e))
        document.querySelector('main').addEventListener('keyup', (e)=>this.#keyEvent(e))
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
    #getSize(c=1) { return (WritingMode.isHorizontal()) ? [this.#getAmount(c), 0] : [0, this.#getAmount(c)] }
    #getAmount(c=1) { return (Size.client.inline + this.#getGapSize()) * c }
    #getGapSize() { return Css.getFloat('--font-size') * Css.getFloat('--column-gap') }
}
window.Page = new Page()
})()
