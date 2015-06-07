/**
 * Created by peter on 15-6-7.
 */
function Enemy(x,y){
    this.loc=new Vector(x,y)
    this.v=new Vector(tool.random(-5,5),tool.random(1,6))
    this.width = tool.random(32, 60);
    this.angle = tool.random(0, 3.14);
    this.angleV = tool.random(-.5, .5);
    this.time = 0;
    this.isDie = false;
    this.img = "enemy1Img";
}

Enemy.prototype.draw=function(){
    var img = document.getElementById(this.img);
    ctx.save()
    ctx.translate(this.loc.x+this.width/2,this.loc.y+this.width/2)
    ctx.rotate(this.angle)
    ctx.drawImage(img,-this.width/2,this.width/2,this.width,this.width)
    ctx.restore()
}

Enemy.prototype.update=function(){
    this.checkHit()
    this.loc.plus(this.v)
    if(this.loc.x+this.width<0||this.loc.x>width||this.loc.y+this.height<0||this.loc.y>height){
        this.isDie=true
        return
    }
    this.angle+=this.angleV
}

Enemy.prototype.checkHit=function(){
    for(var i=0;i<bullets.length;i++){
        if(tool.checkCollision(this,bullets[i])){
            this.isDie=true
            bullets[i].isDie=true
        }
    }
}