(function() {
    class Css {
        get(attr, el) { return getComputedStyle((el) ? el : document.querySelector(':root')).getPropertyValue(attr).trim() }
        getFloat(attr, el) { return parseFloat(this.get(attr, el)) }
        getInt(attr, el) { return parseInt(this.get(attr, el)) }
        set(attr, value, el) { ((el) ? el : document.querySelector(':root')).style.setProperty(attr, value) }
    }
    window.Css = new Css()
})()

