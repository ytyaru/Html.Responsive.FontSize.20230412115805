(function() {
class WritingMode {
    #mode
    #size
    #target
    constructor() {
        this.#target = document.querySelector('main') || document.body
        this.#size = {
            screen: { inline:0, block:0 }, // 画面
            avail: { inline:0, block:0 },  // タスクバー除く画面
            outer: { inline:0, block:0 },  // ブラウザ全体の外周
            inner: { inline:0, block:0 },  // ブラウザ内周
            client: { inline:0, block:0 }, // ブラウザ内の表示領域（スクロールバー除く）
            scrollbar: { inline:0, block:0 }, // スクロールバー
            scroll: { inline:0, start:0, size:0 },
            target: {
                client: { inline:0, block:0 },
                scroll: { inline:0, start:0, size:0 },
            }
        }
        this.Modes= Object.freeze({
            Horizontal: 'horizontal-tb',
            Vertical: 'vertical-rl',
        })
        this.Mode = this.Modes.Horizontal
    }
    get Target() { return this.#target }
    set Target(el) { this.#target = el }
    get Size() { return Object.freeze(this.#deepCopy(this.#size)) }
    get Mode() { return this.#mode }
    set Mode(v) {
        if (this.#isValid(v) && this.#isChange(v)) {
            this.#mode = v
            switch(v) {
                case 'horizontal-tb': this.#setHorizontal(); break;
                case 'vertical-rl': this.#setVertical(); break;
                default: return;
            }
            this.resetSize()
        }
    }
    resetSize() {
        switch(this.#mode) {
            case 'horizontal-tb': return this.#setSizeHorizontal();
            case 'vertical-rl': return this.#setSizeVertical();
            default: return;
        }
    }
    isHorizontal() { return ('horizontal-tb'===this.#mode) }
    isVertical() { return ('vertical-rl'===this.#mode) }
    #deepCopy(obj) { return JSON.parse(JSON.stringify(obj)); } // structuredClone()未実装のため
    #getModeValues() { return Object.keys(this.Modes).map(k=>this.Modes[k]); }
    #error() { throw new Error(`writing-modeの値は次のいずれかのみ有効です。：${this.#getModeValues().toString()}`) }
    #isValid(id) { const v = this.#getModeValues().includes(id); if (!v) { this.#error() } return v;  }
    #isChange(id) { return id!==this.#mode }
    #setHorizontal() {
        Css.set('--writing-mode', 'horizontal-tb')
        Css.set('--text-orientation', 'unset')
        Css.set('--text-decoration', 'underline')
        this.#setSizeHorizontal()
        Css.set('--inline-size', `${this.#size.scroll.inline}px`)
        Css.set('--block-size', `${this.#size.client.block}px`)
        Css.set('--scroll-snap-type-dir', 'x')
        Css.set('--overflow-x', 'scroll')
        Css.set('--overflow-y', 'hidden')
    }
    #setVertical() {
        Css.set('--writing-mode', 'vertical-rl')
        Css.set('--text-orientation', 'upright')
        Css.set('--text-decoration', 'overline')
        this.#setSizeVertical()
        Css.set('--inline-size', `${this.#size.scroll.inline}px`)
        Css.set('--block-size', `${this.#size.client.block}px`)
        Css.set('--scroll-snap-type-dir', 'y')
        Css.set('--overflow-x', 'hidden')
        Css.set('--overflow-y', 'scroll')
    }
    #setSizeHorizontal() {
        this.#size.screen.inline = screen.width;
        this.#size.screen.block = screen.height;
        this.#size.avail.inline = screen.availWidth;
        this.#size.avail.block = screen.availHeight;
        this.#size.outer.inline = window.outerWidth;
        this.#size.outer.block = window.outerHeight;
        this.#size.inner.inline = window.innerWidth;
        this.#size.inner.block = window.innerHeight;
        this.#size.client.inline = document.documentElement.clientWidth;
        this.#size.client.block = document.documentElement.clientHeight;
        this.#size.scrollbar.inline = this.#size.inner.inline - this.#size.client.inline;
        this.#size.scrollbar.block = this.#size.inner.block - this.#size.client.block;
        this.#size.scroll.inline = document.documentElement.scrollWidth
        this.#size.scroll.start = document.documentElement.scrollLeft
        if (this.#target) {
            this.#size.target.client.inline = this.#target.clientWidth
            this.#size.target.client.block = this.#target.clientHeight
            this.#size.target.scroll.inline = this.#target.scrollWidth
            this.#size.target.scroll.start = this.#target.scrollLeft
        }
        console.log(this.#size)
        console.log(this.#target)
    }
    #setSizeVertical() {
        this.#size.screen.inline = screen.height;
        this.#size.screen.block = screen.width;
        this.#size.avail.inline = screen.availHeight;
        this.#size.avail.block = screen.availWidth;
        this.#size.outer.inline = window.outerHeight;
        this.#size.outer.block = window.outerWidth;
        this.#size.inner.inline = window.innerWidth;
        this.#size.inner.block = window.innerWidth;
        this.#size.client.inline = document.documentElement.clientHeight;
        this.#size.client.block = document.documentElement.clientWidth;
        this.#size.scrollbar.inline = this.#size.inner.inline - this.#size.client.inline;
        this.#size.scrollbar.block = this.#size.inner.block - this.#size.client.block;
        this.#size.scroll.inline = document.documentElement.scrollHeight
        this.#size.scroll.start = document.documentElement.scrollTop
        if (this.#target) {
            this.#size.target.client.inline = this.#target.clientHeight
            this.#size.target.client.block = this.#target.clientWidth
            this.#size.target.scroll.inline = this.#target.scrollHeight
            this.#size.target.scroll.start = this.#target.scrollTop
        }
        console.log(this.#size)
        console.log(this.#target)
    }
    /*
    valid(id) { const v = Object.keys(this.Modes).map(k=>this.Modes[k]).includes(id); if (!v) {throw new Error('writing-modeはhorizontal-tbかvertical-rlのどちらかにしてください。')} return v;  }
    valid(id) { return Object.keys(this.Modes).map(k=>this.Modes[k]).includes(id) }
    valid(id) { const v = this.#MODES.includes(id); if (!v) {throw new Error('writing-modeはhorizontal-tbかvertical-rlのどちらかにしてください。')} return v; }
    isChange(id) {
        this.valid(id)
        return (id !== this.#mode) { return }
        this.#mode = id; 
        Css.get(
    }
    set(id) {
        this.#mode = id
        switch(id) {
            case 'horizontal-tb': return this.setHorizontal();
            case 'vertical-rl': return this.setVertical();
            default: return;
        }
    }
    changeMode() {

    }
    */
    /*
    #setSize(names) {
    #getSizes(names) {
        // [inline, block] = [width, height]
        // [inline, block] = [height, width]
        screen[name]
        this.#size.screen.inline = screen[names[0]]
        this.#size.screen.block = screen.[names[1]];
        this.#size.avail.inline = screen.availWidth;
        this.#size.avail.block = screen.availHeight;
        this.#size.outer.inline = window.outerWidth;
        this.#size.outer.block = window.outerHeight;
        this.#size.inner.inline = window.innerWidth;
        this.#size.inner.block = window.innerHeight;
        this.#size.client.inline = document.documentElement.clientWidth;
        this.#size.client.block = document.documentElement.clientHeight;
        this.#size.scrollbar.inline = this.#size.inner.inline - this.#size.client.inline;
        this.#size.scrollbar.block = this.#size.inner.block - this.#size.client.block;
    }

    #setClientSize() {
        switch(Css.get('--writing-mode').toLowerCase()) {
            case 'horizontal-tb':
                this.#size.screen.inline = screen.width;
                this.#size.screen.block = screen.height;
                this.#size.avail.inline = screen.availWidth;
                this.#size.avail.block = screen.availHeight;
                this.#size.outer.inline = window.outerWidth;
                this.#size.outer.block = window.outerHeight;
                this.#size.inner.inline = window.innerWidth;
                this.#size.inner.block = window.innerHeight;
                this.#size.client.inline = document.documentElement.clientWidth;
                this.#size.client.block = document.documentElement.clientHeight;
                this.#size.scrollbar.inline = this.#size.inner.inline - this.#size.client.inline;
                this.#size.scrollbar.block = this.#size.inner.block - this.#size.client.block;
            case 'vertical-rl':
                this.#size.screen.inline = screen.height;
                this.#size.screen.block = screen.width;
                this.#size.avail.inline = screen.availHeight;
                this.#size.avail.block = screen.availWidth;
                this.#size.outer.inline = window.outerHeight;
                this.#size.outer.block = window.outerWidth;
                this.#size.inner.inline = window.innerWidth;
                this.#size.inner.block = window.innerWidth;
                this.#size.client.inline = document.documentElement.clientHeight;
                this.#size.client.block = document.documentElement.clientWidth;
                this.#size.scrollbar.inline = this.#size.inner.inline - this.#size.client.inline;
                this.#size.scrollbar.block = this.#size.inner.block - this.#size.client.block;
            default: throw new Error('writing-modeはhorizontal-tbかvertical-rlのどちらかにしてください。')
        }
    }
    */
}
window.WritingMode = new WritingMode()
})()
