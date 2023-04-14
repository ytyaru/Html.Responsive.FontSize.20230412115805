(function() {
class Html {
    get(q) { return document.querySelector(q) }
    gets(q) { return [...document.querySelectorAll(q)] }
    get Root() { return this.get(':root') }
    get Head() { return this.get('head') }
    get Body() { return this.get('body') }
    get Main() { return this.get('main') }
    get Header() { return this.get('header') }
    get Footer() { return this.get('footer') }
    setHtml(q, v) { this.get(q).innerHTML = v }
    setText(q, v) { this.get(q)[(v.hasNewline() ? 'innerText' : 'textContent')] = v }
    getAttr(q, k) { this.get(q).getAttribute(k) }
    setAttr(q, k, v) { this.get(q).setAttribute(k, v) }
    isDom(o) {
        try { return obj instanceof HTMLElement; }
        catch(e){
            return (typeof obj==="object") &&
                (obj.nodeType===1) && (typeof obj.style === "object") &&
                (typeof obj.ownerDocument ==="object");
        }
    }
    /*
    setText(q, v) { this.get(q).innerText = v }
    setContent(q, v) { if (v.hasNewline()) { this.get(q).innerText = v } else {  }
    hasNewline(v) { return ["\r\n", "\n", "\r"].map(nl=>v.indexOf(nl)).some(b=>b) }
        if (v.indexOf("\r\n")>-1) { return true }
        else if (v.indexOf("\n")>-1) { return true }
        else if (v.indexOf("\r")>-1) { return true }
        else { return false }
    */
}
window.Html = new Html()
})()
