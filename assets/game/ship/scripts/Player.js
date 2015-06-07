/**
 * Created by peter on 15-6-7.
 */
var player={
    loc:new Vector(width/2,height-100),
    v:10,
    width:64,
    life:3,
    bulletrequency:0,
    draw:function(){
        ctx.save()
        ctx.translate(this.loc.x,this.loc.y)
        var img = document.getElementById("playerImg");
        ctx.drawImage(img,-this.width/2,-this.width/2,this.width,this.width)
        ctx.restore()
    },
    loadBullet:function(){
        this.bulletrequency++
        if(this.bulletrequency==4){
            var bullet=new Bullet(this.loc.x-32/2,this.loc.y-32/2)
            bullets.push(bullet)
            this.bulletrequency=0
        }
    },
    keyMove:function(){
        switch (key){
            case 37:
                this.loc.x-=this.v
                if(this.loc.x-this.width/2<=0){
                    this.loc.x=this.width/2
                }
                break;
            case 38:
                this.loc.y-=this.v
                if(this.loc.y-this.width/2<=0){
                    this.loc.y=this.width/2
                }
                break;
            case 39:
                this.loc.x+=this.v
                if(this.loc.x+this.width/2>=width){
                    this.loc.x=width-this.width/2
                }
                break;
            case 40:
                this.loc.y+=this.v
                if(this.loc.y+this.width/2>=height){
                    this.loc.y=height-this.width/2
                }
                break;
            case 32:
                this.loadBullet()
        }
    },
    fire:function(){
        for(var i=0;i<bullets.length;i++){
            var bullet=bullets[i]
            if(bullet.isDie){
                bullets.splice(i,1)
                break;
            }
            bullets[i].draw()
            bullets[i].update()
        }
    },
    update:function(){
        for(var i=0;i<enemys.length;i++){
            if(tool.checkCollision(this,enemys[i])){
                enemys[i].isDie=true
                if(--this.life==0){
                    console.log("you lose!")
                    this.life=3
                }
                return

            }
        }
        this.keyMove()
        this.fire()

    }
}