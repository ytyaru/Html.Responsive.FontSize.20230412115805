(function() {
class Observer {
    #target
    #targets = [document.body, this.#target]
    #resize
    #intersection
    #mutation
    setup(target) {
        this.setupResize(target)
    }
    get Target() { return this.#target }
    set Target(v) {
        if (!Type.isDom(v)) { return }
        this.#target = v
        Size.target.element = v
        Page.target = v
    }
    setupResize(target) {
        this.Target = target
        this.resizeObserver = new ResizeObserver(entries => {
            this.resize()
        })
    }
    observe() { for (let t of [document.body, this.#target]) { this.resizeObserver.observe(t) }; }
    unobserve() { for (let t of [document.body, this.#target]) { this.resizeObserver.unobserve(t) }; }
    resize() {
        console.log('resize')
        const sideSize = [...document.querySelectorAll('header')].map(el=>Css.getFloat('block-size', el)).reduce((sum, v)=>sum+v, 0)
        Css.set('--block-size', `${Size.client.block - sideSize}px`)
        FontSize.calc()
        Column.calc() // 最後に実行すること。末尾の段数を揃えるため。
        this.#show()
    }
    #show() {
        document.getElementById('devicePixelRatio').textContent = `${parseInt(devicePixelRatio * 100)}%`
        document.getElementById('fontSize').textContent = `${Css.get('--font-size')}`
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
    }
}
window.Observer = new Observer()
})()
