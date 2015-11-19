seajs.use(["common"], function(common) {
    window.onload = function () {
      var canvas = document.getElementById('canvas1'),
          context = canvas.getContext('2d'),
          angle = 0,
          range = 50,
          centerY = canvas.height / 2,
          xspeed = 1,
          yspeed = 0.05,
          xpos = 0,
          ypos = centerY;

      context.lineWidth = 2;

      (function drawFrame () {
        window.requestAnimationFrame(drawFrame, canvas);

        context.beginPath();
        context.moveTo(xpos, ypos);
        //Calculate the new position.
        xpos += xspeed;
        angle += yspeed;
        ypos = centerY + Math.sin(angle) * range;
        context.lineTo(xpos, ypos);
        context.stroke();
      }());
    };
})
