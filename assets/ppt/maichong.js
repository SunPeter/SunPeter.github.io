seajs.use(["common"], function(common) {
    var Ball = common.Ball;

    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var angle = 0;
    var cos = Math.cos(angle),
        sin = Math.sin(angle);
    //中心点
    var centerX = width / 2,
        centerY = height / 2;

    //初始点
    // var x = 50,y = 50;
    var range = 10, initScale = 20;
    var ball = new Ball(centerX, centerY, 20);
    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);
        ball.radius = initScale + Math.sin(angle) * range;
        ball.render(ctx);
        angle += 0.1;
    })();
})
