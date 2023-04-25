(function() {
class DropJson {
    constructor() { }
    async setup() {
        this.fileInput = document.getElementById('input-json-file');
        this.dropZones = document.querySelectorAll('body,h1,h2,h3,h4,h5,h6,p,span,label,input,select,textarea,button');
        this.fileInput.addEventListener('change', async(e)=>{ this.#load(e.target.files[0]) })
        for (let zone of this.dropZones) {
            zone.addEventListener('drop', async(e)=>{
                e.stopPropagation();
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (1 < files.length) { return alert('アップロードできるファイルは1つだけです。') }
                //if (!files[0].type.match('application/json')) { return alert('アップロードできるファイルはJSON形式だけです。(application/json)') }
                this.#load(files[0])
                this.fileInput.files = files; //inputのvalueをドラッグしたファイルに置き換える。
                //this.#previewFile(files[0]);
            }, false);
        }
    }
    #load(file) {
        if (!file.type.match('application/json')) { return alert('アップロードできるファイルはJSON形式だけです。(application/json)') }
        this.#previewFile(file);
    }
    #previewFile(file) {
        var fr = new FileReader();
        //fr.readAsDataURL(file);
        fr.readAsText(file);
        fr.onload = ()=>{
            console.log()
            const json = JSON.parse(fr.result)
            console.log(json)
            for (let id of Object.keys(json)) {
                console.log(id)
                const el = document.getElementById(id)
                if (!el) { continue }
                console.log(el)
                console.log(el.tagName)
                if ('input'===el.tagName) {
                    if ('checkbox'===el.type) {
                        document.querySelector(`input[type=checkbox][value="${id}"]`).checked = json[id]
                    }
                    else if ('radio'===el.type) {
                        document.querySelector(`input[type=radio][value="${id}"]`).checked = true
                    }
                    else if ('text'===el.type) {
                        document.getElementById(id).value = json[id]
                    }
                } else {
                    document.getElementById(id).value = json[id]
                    if ('genre'===id) { Genre.genreSelect.dispatchEvent(new Event('change')) }
                }
            }
        };
    }
}
window.DropJson = new DropJson()
})()
