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

