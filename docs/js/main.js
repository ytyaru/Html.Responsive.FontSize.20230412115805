window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    FontSize.init(document.querySelector(`main`))
    //FontSize.init()
    //FontSize.reset()
    document.getElementById('writing-mode').addEventListener('change', (event) => { Css.set('--writing-mode', event.target.value); FontSize.reset(); })
    document.getElementById('column-count').addEventListener('change', (event) => { Css.set('--column-count', event.target.value);  })
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

