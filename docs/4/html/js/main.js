window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    Promise.all([Genre.setup(), BeatSheetSummary.setup(), BeatSheetDetails.setup(), LoglineTable.setup()])
    document.querySelectorAll('textarea.flex').forEach(setupFlexTextarea)
    Downloader.setup()
    DropJson.setup()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

