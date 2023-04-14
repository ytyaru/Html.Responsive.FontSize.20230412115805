(function() {
class Html {
    get(o) { return (Type.isDom(o) ? o : (Type.isString(o)) ? document.querySelector(q) : throw new TypeError('引数はDOMかCSSセレクタ文字列にしてください')) }
    gets(q) { return [...document.querySelectorAll(q)] }
    get Root() { return this.get(':root') }
    get Head() { return this.get('head') }
    get Body() { return this.get('body') }
    get Main() { return this.get('main') }
    get Header() { return this.get('header') }
    get Footer() { return this.get('footer') }
    getHtml(o) { return this.get(o).innerHTML }
    getText(o) { return this.get(o).innerText } // 改行コードはinnerHTMLで<br>に変わる
    //getText(o) { return this.get(o).textContent} // 改行コードはinnerHTMLで改行コードのまま
    setHtml(o, v) { this.get(o).innerHTML = v }
    //setText(o, v) { this.get(o).textContent = v }
    setText(o, v) { this.get(o)[(v.hasNewline() ? 'innerText' : 'textContent')] = v }
    getAttr(o, k) { return this.get(o).getAttribute(k) }
    getAttrInt(o, k) { return parseInt(this.getAttr(o, k)) }
    getAttrFloat(o, k) { return parseFloat(this.getAttr(o, k)) }
    setAttr(o, k, v) { this.get(o).setAttribute(k, v) }
}
window.Html = new Html()
})()
