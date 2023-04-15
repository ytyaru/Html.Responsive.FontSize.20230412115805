(function() {
class LastPadding {
    set() {
        if (Column.Count < 2) { return }
        const columnSize = Size.client.inline / Column.Count
        const pageSize = columnSize * Column.Count
        const gapSize = Css.getFloat('--font-size') * Css.getFloat('--column-gap')
        const diff = Math.abs(Size.target.scroll.inline - ((pageSize * Page.All) + (gapSize * (Page.All - 1))))
        if (diff < 5) { this.#setPadding(0) }
        else if (columnSize <= diff && diff <= pageSize) {
            const addBlankColNum = parseInt(diff / columnSize)
            this.#setPadding(addBlankColNum * Size.client.block)
        } else { throw new Error('計算おかしいと思う') }
    }
    // padding-endが機能しない。たぶんJS APIのバグ
    //#setPadding(px) { document.querySelector('p:last-child').style.setProperty('padding-end', `${px}px`) }
    //#setPadding(px) { document.querySelector('p:last-child').style.setProperty(`padding-${(WritingMode.isHorizontal()) ? 'bottom' : 'right'}`, `${px}px`) }
    #setPadding(px) {
        if (WritingMode.isHorizontal()) {
            Css.set('--last-padding-bottom', `${px}px`)
            Css.set('--last-padding-right', `0px`)
        } else {
            Css.set('--last-padding-bottom', `0px`)
            Css.set('--last-padding-right', `${px}px`)
        }
    }
}
window.LastPadding = new LastPadding()
})()
