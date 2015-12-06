seajs.use(["common"], function(common) {
    var Ball = common.Ball;

    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext("2d");
    var ball=new Ball(0,0,20);
    var width = canvas.width;
    var height = canvas.height;
    var target={
        "x":width,
        "y":height
    }
    var ease=0.05;
    ball.x=ball.y=0;
    (function drawFrame(){
        requestAnimationFrame(drawFrame,canvas);
        ctx.clearRect(0,0,width,height);

        var dx=target.x-ball.x,
            dy=target.y-ball.y;
        var vx=dx*ease,
            vy=dy*ease;

        ball.x+=vx,
        ball.y+=vy;
        ball.render(ctx);
    })();

    window.addEventListener("click",function(e){
        target.x= e.pageX,
        target.y= e.pageY;
    })
})
