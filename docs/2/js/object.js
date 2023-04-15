Object.prototype.getType = ()=>typeof this
Object.prototype.isString = ()=>(typeof this === "string" || this instanceof String)
Object.prototype.isDom = (v)=>{
    try { return this instanceof HTMLElement; }
    catch(e){
        return (typeof this==="object") &&
            (this.nodeType===1) && (typeof this.style === "object") &&
            (typeof this.ownerDocument ==="object");
    }
}
