window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    const res = await fetch(`locales/ja/translation.json`)
    console.log(res)
    const trans = await res.json()
    console.log(trans)
    for (let el of document.querySelectorAll(`input[type=checkbox], input[type=radio]`)) {
        console.log(el.value)
        el.parentElement.append(trans.name[el.value])
    }
    for (let el of document.querySelectorAll(`input[type=text], textarea, select, button`)) {
        el.setAttribute('placeholder', trans.placeholder[el.name])
    }
    // 連動ラジオボタン
    const interactions = {
        'false-victory': 'bad-guys-close-despire',
        'false-defert': 'bad-guys-close-hope',
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
    document.querySelectorAll('textarea.flex').forEach(setupFlexTextarea)
    await Genre.makeUi()
    /*
    for (let el of document.querySelectorAll(`input[type=text], textarea, select, button`)) {
        console.log(trans.name[el.name])
        el.parentElement.prepend(trans.name[el.name])
    }
    console.log('===================')
    for (let el of document.querySelectorAll(`input[type=checkbox], input[type=radio]`)) {
        console.log(el.value)
        el.parentElement.append(trans.name[el.value])
    }
    for (let el of document.querySelectorAll(`input[type=text], textarea, select, button`)) {
        el.setAttribute('placeholder', trans.placeholder[el.name])
    }
    */
    /*
    for (let el of document.querySelectorAll(`input[type=checkbox], input[type=radio]`)) {
        el.setAttribute('placeholder', trans.placeholder[el.value])
    }
    */
//    document.getElementById('').addEventListener('change', (event) => {  })
//    document.getElementById('').addEventListener('change', (event) => {  })
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

