seajs.use(["common", "engin"], function(common, engin) {
    var Segment = common.Segment;

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var segment = new Segment(40,50,100,30,0);
    var segment1 = new Segment(0,0,80,20,0);
    var mouse = {
      x: 120,
      y: 100
    };
    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);
        drag(segment1, mouse.x, mouse.y);
        drag(segment, segment1.x, segment1.y);
        segment.render(ctx);
        segment1.render(ctx);
    })();

    function drag (segment, xpos, ypos) {
      var dx = xpos - segment.x,
          dy = ypos - segment.y;
      segment.rotation = Math.atan2(dy, dx);
      var w = segment.getPin().x - segment.x,
          h = segment.getPin().y - segment.y;
      segment.x = xpos - w;
      segment.y = ypos - h;
    }

    canvas.addEventListener('mousemove', function (event) {
      var x, y;
      x = event.pageX;
      y = event.pageY;
      mouse.x = x;
      mouse.y = y;
    })

},false);
