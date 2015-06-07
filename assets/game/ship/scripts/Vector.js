/**
 * Created by peter on 15-6-7.
 */
function Vector(x,y){
    this.x=x|0
    this.y=y|0
}

Vector.prototype.plus=function(v){
    this.x+= v.x
    this.y+= v.y
}

Vector.prototype.scale=function(s){
    this.x*=s
    this.y*=s
}

Vector.prototype.getAngle=function(){
    return Math.atan2(this.y , this.x)
}

Vector.prototype.getLength=function(){
    return Math.sqrt(this.x*this.x+this.y*this.y)
}