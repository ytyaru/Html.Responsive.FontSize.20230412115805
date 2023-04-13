(function() {
class WritingMode {
    #mode
    #size
    constructor() {
        this.#size = {
            screen: { inline:0, block:0 }, // 画面
            avail: { inline:0, block:0 },  // タスクバー除く画面
            outer: { inline:0, block:0 },  // ブラウザ全体の外周
            inner: { inline:0, block:0 },  // ブラウザ内周
            client: { inline:0, block:0 }, // ブラウザ内の表示領域（スクロールバー除く）
            scrollbar: { inline:0, block:0 }, // スクロールバー
        }
        this.Modes= Object.freeze({
            Horizontal: 'horizontal-tb',
            Vertical: 'vertical-rl',
        })
        console.log(this.#getModeValues())
        console.log(this.#getModeValues().includes('a'))

        this.Mode = this.Modes.Horizontal
    }
    show() { console.log('mode:', this.#mode); console.log('size:', this.#size); }
    get Size() { return Object.freeze(this.#deepCopy(this.#size)) }
    get Mode() { return this.#mode }
    set Mode(v) {
        console.log(v)
        if (this.#isValid(v) && this.#isChange(v)) {
            this.#mode = v
            switch(v) {
                case 'horizontal-tb': return this.#setHorizontal();
                case 'vertical-rl': return this.#setVertical();
                default: return;
            }
        }
    }
    resetSize() {
        switch(this.#mode) {
            case 'horizontal-tb': return this.#setSizeHorizontal();
            case 'vertical-rl': return this.#setSizeVertical();
            default: return;
        }
    }
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
    }
    #setVertical() {
        Css.set('--writing-mode', 'vertical-rl')
        Css.set('--text-orientation', 'upright')
        Css.set('--text-decoration', 'overline')
        this.#setSizeVertical()
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
