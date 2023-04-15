(function() {
function isHorizontal() { return 'horizontal-tb'===Css.get('--writing-mode').trim() }
function isVertical() { return 'vertical-rl'===Css.get('--writing-mode').trim() }
class Screen { get inline() { return (isHorizontal()) ? screen.width : screen.height }
    get block() { return (isHorizontal()) ? screen.height : screen.width } }
class Avail { get inline() { return (isHorizontal()) ? screen.availWidth : screen.availHeight }
    get block() { return (isHorizontal()) ? screen.availHeight : screen.availWidth } }
class Outer { get inline() { return (isHorizontal()) ? window.outerWidth : window.outerHeight }
    get block() { return (isHorizontal()) ? window.outerHeight : window.outerWidth } }
class Inner { get inline() { return (isHorizontal()) ? window.innerWidth : window.innerHeight }
    get block() { return (isHorizontal()) ? window.innerHeight : window.innerWidth } }
class Client { get inline() { return (isHorizontal()) ? document.documentElement.clientWidth : document.documentElement.clientHeight }
    get block() { return (isHorizontal()) ? document.documentElement.clientHeight : document.documentElement.clientWidth } }
class ScrollBar { get inline() { return (isHorizontal()) ? (window.innerWidth - document.documentElement.clientWidth) : (window.innerHeight - document.documentElement.clientHeight) }
    get block() { return (isHorizontal()) ? (window.innerHeight - document.documentElement.clientHeight) : (window.innerWidth - document.documentElement.clientWidth) } }
class Scroll { get inline() { return (isHorizontal()) ? document.documentElement.scrollWidth : document.documentElement.scrollHeight }
    get block() { return (isHorizontal()) ? document.documentElement.scrollHeight : document.documentElement.scrollWidth }
    get start() { return (isHorizontal()) ? document.documentElement.scrollLeft : document.documentElement.scrollTop }
    get end() { return (isHorizontal()) ? document.documentElement.scrollTop : document.documentElement.scrollLeft }
}
class ElementClient {
    #element
    constructor(el) { this.Element = el }
    get element() { return this.#element }
    set element(v) { if (Type.isDom(v)) { this.#element = v } }
    get inline() { return (isHorizontal()) ? this.#element.clientWidth : this.#element.clientHeight }
    get block() { return (isHorizontal()) ? this.#element.clientHeight : this.#element.clientWidth }
}
class ElementScroll {
    #element
    constructor(el) { this.Element = el }
    get element() { return this.#element }
    set element(v) { if (Type.isDom(v)) { this.#element = v } }
    get inline() { return (isHorizontal()) ? this.#element.scrollWidth : this.#element.scrollHeight }
    get block() { return (isHorizontal()) ? this.#element.scrollHeight : this.#element.scrollWidth }
    get start() { return (isHorizontal()) ? this.#element.scrollLeft : this.#element.scrollTop }
    get end() { return (isHorizontal()) ? this.#element.scrollTop : this.#element.scrollLeft }
}
class Element {
    #element
    #client
    #scroll
    constructor(el) { this.Element = el; this.#client = new ElementClient(el); this.#scroll = new ElementScroll(el); }
    get element() { return this.#element }
    set element(v) { console.log(v); if (Type.isDom(v)) { this.#element = v; this.#client.element = v; this.#scroll.element = v; } }
    get client() { return this.#client }
    get scroll() { return this.#scroll }
}
class Size {
    #screen = new Screen()
    #avail = new Avail()
    #outer = new Outer()
    #inner = new Inner()
    #client = new Client()
    #target = new Element()
    #scrollbar = new ScrollBar()
    get screen() { return this.#screen }
    get avail() { return this.#avail }
    get outer() { return this.#outer }
    get inner() { return this.#inner }
    get client() { return this.#client }
    get target() { return this.#target }
    get scrollbar() { return this.#scrollbar }
}
window.Size = new Size()
})()

