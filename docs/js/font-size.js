(function() {
    class FontSize {
        #target
        #inlineSize
        #blockSize
        init(el) {
            //if (this.resizeObserver) { return }
            this.#target = (el) ? el : document.body
            this.resizeObserver = new ResizeObserver(entries => { this.reset() })
            this.resizeObserver.observe(this.#target);
        }
        reset() {
            this.inlineSize()
            this.columnCount()
            this.fontSize()
            console.log(`inlineSize: ${this.#inlineSize}`)
            console.log(`columnCount: ${this.columnCount()}`)
            console.log(`--column-count: ${Css.get('--column-count')}`)
            console.log(`--font-size: ${Css.get('--font-size')}`)
        }
        inlineSize() {
            console.log('***************************************')
            console.log(Css.get('--writing-mode').toLowerCase())
            console.log('horizontal-tb'===Css.get('--writing-mode').toLowerCase())
            console.log(`screen.width: ${screen.width}`)
            console.log(`document.body.clientWidth: ${document.body.clientWidth}`)
            console.log(`document.documentElement.clientHeight: ${document.documentElement.clientHeight}`)
            console.log(`inlineSize: ${this.#inlineSize}`)
            document.getElementById('clientWidth').textContent = `${screen.width}`
            document.getElementById('clientHeight').textContent = `${document.documentElement.clientHeight}`
            this.#getSize()
            console.log(this.#inlineSize, this.#blockSize)
            //console.log(this.#getSize())
//            [this.#inlineSize, this.#blockSize] = this.#getSize()
//            console.log('***********', this.#inlineSize, this.#blockSize)
            Css.set(`--block-size`, `${this.#blockSize}px`)
            console.log(Css.get(`--block-size`))
            switch(Css.get('--writing-mode').toLowerCase()) {
                case 'horizontal-tb': this.#inlineSize = screen.width; return; 
                case 'vertical-rl': this.#inlineSize = document.documentElement.clientHeight; return;
//                case 'horizontal-tb': this.#inlineSize = document.body.clientWidth; return; 
//                case 'vertical-rl': this.#inlineSize = document.documentElement.clientHeight; return;
                //case 'horizontal-tb': return this.#inlineSize = this.#target.clientWidth; 
                //case 'vertical-rl': return this.#inlineSize = this.#target.clientHeight;
                default: throw new Error('writing-modeはhorizontal-tbかvertical-rlのどちらかにしてください。')
            }
            return this.#inlineSize;
        }
        #getSize() {
            switch(Css.get('--writing-mode').toLowerCase()) {
                case 'horizontal-tb':
                    this.#inlineSize = screen.width;
                    this.#blockSize = document.documentElement.clientHeight;
                    return;
                case 'vertical-rl':
                    this.#inlineSize = screen.width;
                    this.#blockSize = document.documentElement.clientHeight;
                    return;
                default: throw new Error('writing-modeはhorizontal-tbかvertical-rlのどちらかにしてください。')
            }
            /*
            switch(Css.get('--writing-mode').toLowerCase()) {
                case 'horizontal-tb': return [screen.width, document.documentElement.clientHeight];
                case 'vertical-rl': return [document.documentElement.clientHeight, screen.width];
                default: throw new Error('writing-modeはhorizontal-tbかvertical-rlのどちらかにしてください。')
            }
            */
        }
        columnCount() { return (this.#inlineSize < 1280) ? 1 : 2; }
        fontSize() {
            /*
            if (this.#inlineSize < 720) { Css.set('--column-count', '1'); Css.set(`--font-size`, '16px'); }
            else if (this.#inlineSize < 1024) { this.setFontSize(1, 40) }
            else if (this.#inlineSize < 1280) { this.setFontSize(1, 45) }
            else if (this.#inlineSize < 1920) { this.setFontSize(2, 35) }
            else if (this.#inlineSize < 2048) { this.setFontSize(2, 40) }
            else { this.setFontSize(2, 45) }
            */
            if (this.#inlineSize.inRange(0, 719)) { Css.set('--column-count', '1'); Css.set(`--font-size`, '16px'); }
            else if (this.#inlineSize.inRange(720, 1023)) { this.setFontSize(1, 40) }
            else if (this.#inlineSize.inRange(1024, 1279)) { this.setFontSize(1, 45) }
            else if (this.#inlineSize.inRange(1280, 1919)) { this.setFontSize(2, 35) }
            else if (this.#inlineSize.inRange(1920, 2047)) { this.setFontSize(2, 40) }
            else { this.setFontSize(2, 45) }
        }
        setFontSize(columnCount, lineOfChars) {
            Css.set('--column-count', `${columnCount}`)
            const LS = Css.getFloat('--letter-spacing')
            const G = Css.getFloat('--column-gap')
            const PS = Css.getFloat('--padding-inline-start')
            const PE = Css.getFloat('--padding-inline-end')
            //const F = this.#inlineSize / ((lineOfChars + (lineOfChars * LS) * columnCount) + G)
            //const F = this.#inlineSize / (((lineOfChars + (lineOfChars * LS)) * columnCount) + G + PS + PE)
            const F = this.#inlineSize / (((lineOfChars + (lineOfChars * LS) + (PS + PE)) * columnCount) + (G * (columnCount-1)))
            console.log(columnCount, lineOfChars, LS, G, F)
            Css.set('--font-size', `${F}px`)
            //Css.set('--font-size', `16px`)
            return F
        }
    }
    window.FontSize = new FontSize()
})();
