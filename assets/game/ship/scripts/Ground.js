/**
 * Created by peter on 15-6-7.
 */
(function(){
    var img=document.getElementById("groundImg"),
    ground={
        y:0,
        draw:function(){
            this.y+=2
            if(this.y>width){
                this.y=0
            }
            var y1=this.y
            y2=width-y1
            ctx.drawImage(img,0,y2,width,y1,0,0,width,y1)
            ctx.drawImage(img,0,0,width,y2,0,y1,width,y2)
        }
    }
    window.ground=ground
})()