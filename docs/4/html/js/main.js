window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    Promise.all([Genre.setup(), BeatSheetSummary.setup(), BeatSheetDetails.setup()])
    document.querySelectorAll('textarea.flex').forEach(setupFlexTextarea)
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

