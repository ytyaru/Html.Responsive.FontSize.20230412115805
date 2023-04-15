window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    Observer.setupResize(document.querySelector(`main`))
//    Observer.resize()
//    FontSize.init(document.querySelector(`main`))
    Page.setupKeyEvent()
    //FontSize.init()
    //FontSize.reset()
    //WritingMode.show()
    document.getElementById('writing-mode').addEventListener('change', (event) => { WritingMode.Mode = event.target.value; Column.calc(WritingMode.Size); })
    //document.getElementById('writing-mode').addEventListener('change', (event) => { Css.set('--writing-mode', event.target.value); FontSize.reset(); })
    document.getElementById('column-count').addEventListener('change', (event) => { Css.set('--column-count', event.target.value);  })
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

