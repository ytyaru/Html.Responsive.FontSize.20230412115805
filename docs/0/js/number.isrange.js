(function() {
    Number.prototype.inRange = function(min, max) { return (min <= this && this <= max) }
    //Number.prototype.inRange = function(min, max) { const v = this.valueOf(); return (min <= v && v <= max) }
})()

