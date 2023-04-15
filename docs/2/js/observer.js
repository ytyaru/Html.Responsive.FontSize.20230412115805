(function() {
class Observer {
    #resize
    #intersection
    #mutation
    setup(target) {
        this.setupResize(target)
    }
    setupResize(target) {
        console.log('setupResize', target, Type.isDom(target), typeof target, target instanceof HTMLElement, target.scrollWidth)
        if (!Type.isDom(target)) { return }
        console.log('setupResize', target, typeof target, target instanceof HTMLElement)
        Size.target.element = target
        console.log(Size.target.element)
        Page.target = target
        this.resizeObserver = new ResizeObserver(entries => {
            this.resize()
            //Page.calc(this.#size)
            /*
            for (let entry of entries) {
                
            }
            */
        })
        this.resizeObserver.observe(target);
    }
    resize() {
        console.log('resize')
        const sideSize = [...document.querySelectorAll('header')].map(el=>Css.getFloat('block-size', el)).reduce((sum, v)=>sum+v, 0)
        Css.set('--block-size', `${Size.client.block - sideSize}px`)
        FontSize.calc()
        Column.calc() // 最後に実行すること。末尾の段数を揃えるため。
    }
}
window.Observer = new Observer()
})()
