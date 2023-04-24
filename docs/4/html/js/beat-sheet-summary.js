(function() {
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
        const css = `:root { --beat-sheet-summary-description-display:inherit; }
#beat-sheet-summary table tr td:nth-child(4) { display:var(--beat-sheet-summary-description-display); }`
        style.textContent = css
        return style
    }
    #setupEvent() {
        document.getElementById('is-show-beat-sheet-summary-description').addEventListener('change', async(event) => {
            document.querySelector(':root').style.setProperty('--beat-sheet-summary-description-display', (event.target.checked) ? 'inherit' : 'none')
        })
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
        //for (let key of ['order', 'sid', 'label', 'pos', 'labelJa', 'descriptionJa']) {
        for (let key of ['order', 'label', 'pos', 'descriptionJa']) {
            tr.appendChild(this.#makeTd(beat[key]))
        }
        //console.log(beat.lid, beat.labelJa)
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
        input.id = id
        input.type = 'text'
        input.style = 'min-width:50vw;max-width:100%;'
        //input.style = 'width:9999px;'
        //input.style = 'width:minmax(50vw, 100%);'
        //input.placeholder = placeholder
        input.placeholder = (placeholder) ? placeholder : ''
        //input.setAttribute('placeholder', (placeholder) ? placeholder : '')
        td.appendChild(input)
        return td
    }
}
window.BeatSheetSummary = new BeatSheetSummary()
})()
})()

