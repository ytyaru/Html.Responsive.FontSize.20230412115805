(function() {
class Downloader {
    constructor() { }
    setup() { document.getElementById('download').addEventListener('click', async(event) => { this.download() }) }
    download() {
        const blob = new Blob([JSON.stringify(this.#getData())], {type:'application/json;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = `${document.getElementById('title').value}.json`;
        a.href = url;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
    #getData() {
        const obj = {}
        obj['downloaded'] = new Date().toISOString()
        for (let el of document.querySelectorAll(`input[type=text], textarea, select`)) {
            obj[el.id] = el.value
        }
        delete obj['genre-summary']
        for (let el of document.querySelectorAll(`input[type=checkbox]:checked`)) {
            obj[el.name] = el.checked
        }
        for (let el of document.querySelectorAll(`input[type=radio]:checked`)) {
            obj[el.name] = el.value
        }
        console.log(`keys:${Object.keys(obj).length}`)
        return obj
    }
}
window.Downloader = new Downloader()
})()
