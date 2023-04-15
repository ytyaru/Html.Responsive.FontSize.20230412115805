window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    Observer.setupResize(document.querySelector(`main`))
    WritingMode.Mode = WritingMode.Modes.Horizontal
    Page.setupKeyEvent()
    Observer.resize()
    LastPadding.set()
    Observer.observe()
    document.getElementById('writing-mode').addEventListener('change', (event) => { WritingMode.Mode = event.target.value; Column.calc(WritingMode.Size); })
    document.getElementById('column-count').addEventListener('change', (event) => { Css.set('--column-count', event.target.value);  })
    Page.first()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

