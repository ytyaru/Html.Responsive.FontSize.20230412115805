(function() {
class LoglineTable {
    constructor() { }
    async setup() {
        const table = document.getElementById('logline-table')
        table.parentElement.insertBefore(this.#makeStyle(), table), 
        this.#setInputWidth()
        this.#setupEvent()
    }
    #makeStyle() {
        const style = document.createElement('style')
        const css = `:root { --logline-table-input-width:50vw; --logline-table-display:inherit; }
#logline-table { width:100%; border-collapse:collapse; display:var(--logline-table-display);}
#logline-table :is(table,tr,td,input) { padding:0; margin:0; }
/*#logline-table tr td input[type=text] { width:var(--logline-table-input-width); }*/
#logline-table tr td:nth-child(1) { width:var(--logline-table-input-width); }
#logline-table tr td { white-space:nowrap; }
#logline-table tr td input[type=text] { width:100%; }
`
        style.textContent = css
        return style
    }
    #setInputWidth() {
        const firstTd = document.querySelector('#logline-table tr td:first-child')
        const firstLeft = firstTd.getBoundingClientRect().left
        console.log([...document.querySelectorAll('#logline-table tr td span')])
        console.log([...[...document.querySelectorAll('#logline-table tr td span')].map(span=>span.getBoundingClientRect().right - span.getBoundingClientRect().left)])
        console.log(Math.max(...[...[...document.querySelectorAll('#logline-table tr td span')].map(span=>span.getBoundingClientRect().right - span.getBoundingClientRect().left)]))
        const spanWidth = Math.max(...[...[...document.querySelectorAll('#logline-table tr td span')].map(span=>span.getBoundingClientRect().right - span.getBoundingClientRect().left)])
        const width = `calc(50vw - ${firstLeft}px - ${spanWidth}px)`
        document.querySelector(':root').style.setProperty('--logline-table-input-width', width)
    }
    #setupEvent() {
        const ui = document.getElementById('is-show-logline-table')
        ui.addEventListener('change', async(event) => {
            document.querySelector(':root').style.setProperty('--logline-table-display', (event.target.checked) ? 'inherit' : 'none')
            //this.#getInputWidth(event.target.checked) 
        })
        ui.checked = false
        ui.dispatchEvent(new Event('change'))
    }
}
window.LoglineTable = new LoglineTable()
})()
