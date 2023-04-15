(function() {
class Column {
    #count
    calc() {
        this.#count = (Size.client.inline < 1280) ? 1 : 2;
        Css.set('--column-count', `${this.#count}`)
    }
    get Count() { return this.#count; }
}
window.Column = new Column()
})()
