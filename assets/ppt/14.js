seajs.use(["common"], function(common) {
    var Ball = common.Ball;

    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext("2d");
    var ball=new Ball(0,0,20);
    var width = canvas.width;
    var height = canvas.height;
    target={
        "x":width/2,
        "y":height/2
    }
    k=0.01,vx=0,vy=0;
    (function drawFrame(){
        var animRequest=requestAnimationFrame(drawFrame,canvas);
        ctx.clearRect(0,0,width,height);
        var dx=target.x-ball.x;
        var ax=dx*k;
        vx+=ax;
        vx*=0.99;//消耗
        ball.x+=vx;

        var dy=target.y-ball.y;
        var ay=dy*k;
        vy+=ay;
        vy*=0.99;//消耗
        ball.y+=vy;

        ball.render(ctx);
        if(Math.sqrt(Math.pow(target.x-ball.x,2)+Math.pow(target.y-ball.y,2))<=0.1){
            cancelRequestAnimationFrame(animRequest);
        }
    })();

    window.addEventListener("click",function(e){
        target.x= e.pageX;
        target.y= e.pageY;
    });
})
