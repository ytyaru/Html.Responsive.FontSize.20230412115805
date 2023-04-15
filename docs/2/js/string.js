String.prototype.hasNewline = ()=>["\r\n", "\n", "\r"].map(nl=>this.indexOf(nl)).some(b=>b)
    
