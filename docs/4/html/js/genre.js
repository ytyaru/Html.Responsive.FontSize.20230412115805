(function() {
class Genre {
    constructor() { this.genres = null; this.workExamples = new Map(); this.genreSelect = null; this.subGenreSelect = null; }
    //async load() { await Promise.all([this.loadGenres(), this.loadWorkExamples()]); }
    async load() {
        await this.loadGenres()
        await this.loadWorkExamples()
    }
    async loadGenres() {
        if (this.genres) { return this.genres }
        this.genres = await Tsv.load(`locales/en/genre.tsv`)
        console.log(this.genres)
        for (let i=0; i<this.genres.length; i++) {
            this.genres[i].triple = this.genres[i].triple.split(',')
            this.genres[i].sub = this.genres[i].sub.split(',')
        }
        //return this.genres
    }
    async loadWorkExample(subGenreId) {
        if (!this.workExamples.has(subGenreId)) {
            const path = `locales/en/genre-works/${genre.sid}/${sub}.tsv`
            this.workExamples.set(sub, await Tsv.load(path))
        }
        return this.workExamples.get(subGenreId)
    }
    async loadWorkExamples() {
        for (let genre of this.genres) {
            for (let sub of genre.sub) {
                const path = `locales/en/genre-works/${genre.sid}/${sub}.tsv`
                this.workExamples.set(sub, await Tsv.load(path))
            }
        }
        console.log(this.workExamples)
        /* TSVファイル先頭にヘッダを一括追記した
            TARGET=/tmp/work/Html.Responsive.FontSize.20230412115805/docs/4/html/locales/en/genre-works/
            cd "$TARGET"
            find . -name '*.tsv' | xargs sed -i '1s/^/nameEn\turlEn\tnameJa\turlJa\n/'
        */
    }
    async makeUi() {
        if (!this.genres) { await this.load() }
        this.#addGenreSelectOptions()
        this.#resetSubGenreSelect(this.genres[0].sid)
        //this.genreSelect.value = this.genres[0].sid
        this.genreSelect.dispatchEvent(new Event('change'))
    }
    #addGenreSelectOptions() {
        this.genreSelect = document.getElementById('genre')
        this.genreSelect.innerHTML = ''
        for (let i=0; i<this.genres.length; i++) {
            const option = document.createElement('option')
            option.textContent = this.genres[i].label
            option.value = this.genres[i].sid
            this.genreSelect.appendChild(option)
        }
        this.genreSelect.addEventListener('change', (e) => {
            this.#resetSubGenreSelect(e.target.value)
            const genre = this.genres.filter(g=>g.sid===e.target.value)[0]
            //document.getElementById('genre-summary').textContent = genre.summaryJa
            document.getElementById('genre-summary').value = genre.summaryJa
            document.getElementById('genre-icon').src = `asset/image/icon/genre/png/220x220/${genre.lid}.png`
            document.getElementById('genre-icon').title = genre.label
        })
        this.subGenreSelect = document.getElementById('sub-genre')
        this.subGenreSelect.addEventListener('change', (e) => {
            this.#resetWorkExamples(e.target.value)
        })
    }
    #resetSubGenreSelect(genreId) {
        if (this.genres.some(g=>g.sid===genreId)) {
            this.subGenreSelect = document.getElementById('sub-genre')
            const genre = this.genres.filter(g=>g.sid===genreId)[0]
            this.subGenreSelect.innerHTML = ''
            for (let sub of genre.sub) {
                const option = document.createElement('option')
                option.textContent = sub
                option.value = sub
                this.subGenreSelect.appendChild(option)
            }
        }
    }
    #resetWorkExamples(subGenreId) {
        console.log(this.workExamples.get(subGenreId))
//        `locales/en/genre-works/wd/cop-whydunit.tsv`
//        `locales/en/genre-works/${this.genreSelect.value}/${subGenreId}.tsv`
    }
    /*
    makeGenreSelect() {
        this.genreSelect = document.createElement('select')
        this.genreSelect.setAttribute('id', 'genre')
        for (let i=0; i<this.genres.length; i++) {
            const option = document.createElement('option')
            option.textContent = this.genres[i].label
            option.value = this.genres[i].sid
            this.genreSelect.appendChild(option)
        }
        this.genreSelect.addEventListener('change', (e) => {
            this.resetSubGenre(e.target.value)
        })

            document.querySelector(senders[i]).addEventListener('change', (e) => {
        return select
    }
    makeSubGenreSelect() {
        this.subGenreSelect = document.createElement('select')
        this.subGenreSelect.setAttribute('id', 'sub-genre')
        for (let i=0; i<this.genres.length; i++) {
            const option = document.createElement('option')
            option.textContent = this.genres[i].label
            option.value = this.genres[i].sid
            select.appendChild(option)
        }
        this.subGenreSelect.addEventListener('change', (e) => {
            this.resetSubGenreSelect(e.target.value)
        })
    }
    */
}
window.Genre = new Genre()
})()
