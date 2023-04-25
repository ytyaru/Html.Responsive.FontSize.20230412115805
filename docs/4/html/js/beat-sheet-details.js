(function() {
class BeatSheetDetails {
    constructor() { this.trans = null; }
    async setup() {
        await this.#load()
        // ラベル＆プレースホルダー設定
        for (let el of document.querySelectorAll(`input[type=checkbox], input[type=radio]`)) {
            if (this.trans.form.label.hasOwnProperty(el.value)) {
                console.log(el.value)
                el.parentElement.append(this.trans.form.label[el.value])
            }
        }
        for (let el of document.querySelectorAll(`input[type=text], textarea, select, button`)) {
            if (this.trans.form.placeholder.hasOwnProperty(el.name)) {
                el.setAttribute('placeholder', this.trans.form.placeholder[el.name])
            }
        }
        // 連動ラジオボタン
        const interactions = {
            'false-victory': 'bad-guys-close-in-despire',
            'false-defert': 'bad-guys-close-in-hope',
            'theam-assembles': 'storming-the-castle-despire',
            'theam-abandons-hero': 'storming-the-castle-hope'
        }
        for (let key of Object.keys(interactions)) {
            const value = interactions[key]
            const senders = [key, value].map(v=>`input[type=radio][value="${v}"]`)
            const receivers = senders.slice().reverse()
            for (let i=0; i<2; i++) {
                document.querySelector(senders[i]).addEventListener('change', (e) => {
                    document.querySelector(receivers[i]).checked = true
                })
            }
        }
    }
    async #load() {
        if (!this.trans) {
            const res = await fetch(`locales/ja/translation.json`)
            console.log(res)
            this.trans = await res.json()
        }
        return this.trans
    }
}
window.BeatSheetDetails = new BeatSheetDetails()
})()

