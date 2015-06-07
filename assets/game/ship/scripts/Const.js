/**
 * Created by peter on 15-6-7.
 */
var width=500,
    height=500,
    ctx=document.getElementById("ground").getContext("2d"),
    requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback) {
    return window.setTimeout(callback, 100 / 60);
}


    tool={
    random:function(x,y){
       return parseInt(Math.random()*(y-x)+x)
    },
    checkCollision:function(objA,objB){
        if(objA.loc.x+objA.width>objB.loc.x&&objA.loc.x<objB.loc.x+objB.width){
            if(objA.loc.y+objA.width>objB.loc.y&&objA.loc.y<objB.loc.y+objB.width){
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }
}


