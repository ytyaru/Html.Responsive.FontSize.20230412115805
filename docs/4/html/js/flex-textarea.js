// https://qiita.com/tsmd/items/fce7bf1f65f03239eef0
/*
function flexTextarea(el) {
    const dummy =  el.querySelector('.flex-textarea__dummy')
    el.querySelector('.flex-textarea__textarea').addEventListener('input', e => {
        dummy.textContent = e.target.value + '\u200b'
    })
}
document.querySelectorAll('.flex-textarea').forEach(flexTextarea)
*/

function setupFlexTextarea(ta) {
    console.log('setupFlexTextarea', ta)
    const ft = document.createElement('div')
    ft.classList.add('flex-textarea')
    const dummy = document.createElement('div')
    dummy.classList.add('flex-textarea-dummy')
    dummy.setAttribute('aria-hidden', 'true')
    ft.appendChild(dummy)
    ta.parentNode.insertBefore(ft, ta)
    ft.appendChild(ta)
    ta.addEventListener('input', e => {
        console.log('setupFlexTextarea Event', e)
        dummy.textContent = e.target.value + '\u200b'
        //e.target.previousElementSibling.textContent = e.target.value + '\u200b'
    })
    ta.value = ''
    ta.dispatchEvent(new Event('input'))
}

