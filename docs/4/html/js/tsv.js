(function() {
class Tsv {
    static async load(path) { // `locales/en/genre.tsv`
        const res = await fetch(path)
        const txt = await res.text()
        const tsv = txt.trim().replace(/(\r?\n)+/g, "\n")
        console.log(tsv)
        const lines = tsv.split('\n').map(l=>l.split('\t'))
        const header = lines.shift()
        return lines.map(l=>header.reduce((a, c, i, s)=>Object.assign(a, {[c]:l[i]}), {}))
        //const res = await fetch(path)
        //const tsv = await res.text()
    }
}
window.Tsv = Tsv
})()
