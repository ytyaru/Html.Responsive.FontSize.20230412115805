(function() {
class BeatSheetSummary {
    constructor() { this.beats = null; this.table = null; }
    async setup() {
        if (!this.beats) { await this.#load() }
        const bss = document.getElementById('beat-sheet-summary')
        bss.appendChild(this.#makeStyle())
        bss.appendChild(this.#makeTable())
        this.#setupEvent()
    }
    #makeStyle() {
        const style = document.createElement('style')
        const css = `:root { --beat-sheet-summary-description-display:inherit; --beat-sheet-summary-input-width:50vw; }
#beat-sheet-summary:is(table,tr,td,input) { padding:0; margin:0; }
#beat-sheet-summary table tr td:nth-child(4) { display:var(--beat-sheet-summary-description-display); }
#beat-sheet-summary table tr td input { width:var(--beat-sheet-summary-input-width); }`
        style.textContent = css
        return style
    }
    #setupEvent() {
        const ui = document.getElementById('is-show-beat-sheet-summary-description')
        ui.addEventListener('change', async(event) => {
            document.querySelector(':root').style.setProperty('--beat-sheet-summary-description-display', (event.target.checked) ? 'inherit' : 'none')
            this.#getInputWidth(event.target.checked) 
        })
        ui.checked = false
        ui.dispatchEvent(new Event('change'))
    }
    #getInputWidth(isShowDescription) {
        const lastTd = document.querySelector('#beat-sheet-summary table tr td:last-child')
        console.log(`${lastTd.getBoundingClientRect().left}px`)
        const width = (isShowDescription) ? `50vw` : `calc(99vw - ${lastTd.getBoundingClientRect().left}px)`
        console.log(`${width}`)
        document.querySelector(':root').style.setProperty('--beat-sheet-summary-input-width', width)
    }
    async #load() {
        if (this.beats) { return this.beats }
        this.beats = await Tsv.load(`locales/en/beats.tsv`)
        console.log(this.beats)
    }
    #makeTable() {
        const table = document.createElement('table')
        for (let beat of this.beats) {
            table.appendChild(this.#makeTr(beat))
        }
        return table
    }
    #makeTr(beat) {
        const tr = document.createElement('tr')
        //for (let key of ['order', 'sid', 'lid', 'label', 'pos', 'description', 'labelJa', 'descriptionJa']) {
        for (let key of ['order', 'label', 'pos', 'descriptionJa']) {
            tr.appendChild(this.#makeTd(beat[key]))
        }
        tr.appendChild(this.#makeInput(beat.lid, beat.labelJa))
        return tr
    }
    #makeTd(text) {
        const td = document.createElement('td')
        td.textContent = (text.startsWith('14-')) ? '' : text 
        td.style = 'min-width:10px;'
        return td
    }
    #makeInput(id, placeholder) {
        console.log(id, placeholder)
        const td = document.createElement('td')
        const input = document.createElement('input')
        input.id = `summary-${id}`
        input.type = 'text'
        input.style = 'width:var(--beat-sheet-summary-input-width);'
        input.placeholder = (placeholder) ? placeholder : ''
        td.appendChild(input)
        return td
    }
}
window.BeatSheetSummary = new BeatSheetSummary()
})()
