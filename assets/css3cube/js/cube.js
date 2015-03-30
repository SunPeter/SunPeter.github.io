var perspectiveX ,perspectiveY ,perspectiveZ;

var _rotateX,_rotateY,_rotateZ;
window.onload = function() {
	var stage = document.querySelector("#stage"),
		cube=document.querySelector("#cube");
    // var X = document.querySelector("#x"),
    //     Y = document.querySelector("#y"),
    //     Z = document.querySelector("#z");

    // var rotateX = document.querySelector("#rotatex"),
    //     rotateY = document.querySelector("#rotatey"),
    //     rotateZ = document.querySelector("#rotatez");
    var rotateY = document.querySelector("#rotatey");
    
    // X.onchange = function() {
    //     perspectiveX = this.value;
    //     setPerspective(perspectiveX, perspectiveY);
    // }
    // Y.onchange = function() {
    //     perspectiveY = this.value;
    //     setPerspective(perspectiveX, perspectiveY);
    // }
    // Z.onchange = function() {
    //     perspectiveZ = this.value; 
    //     stage.style.webkitPerspective= perspectiveZ + "px"
    // }

    // rotateX.onchange = function() {
    //     _rotateX = this.value;
    //     setRotate(_rotateX,_rotateY,_rotateZ);
    // }
    rotateY.onchange = function() {
        _rotateY = this.value;
        setRotate(_rotateX,_rotateY,_rotateZ);
    }
    // rotateZ.onchange = function() {
    //     _rotateZ = this.value;
    //     setRotate(_rotateX,_rotateY,_rotateZ);
    // }

    // var parallax = new Parallax(cube);

}
function setRotate(x,y,z){
	// x=x||0 
	// y=y||0 
	// z=z||0
	// var rotateText="rotateX("+x+"deg) rotateY("+y+"deg) rotateZ("+z+"deg)"
    var rotateText="translateZ(120.3125px) rotateX(1deg) rotateY("+y+"deg)";
	cube.style.webkitTransform=rotateText
}
function setPerspective(x, y) {
	x=x||0,y=y||0
    stage.style.webkitPerspectiveOrigin = x + "px " + y + "px"
}

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) {
        var rotateDegrees =event.alpha?event.alpha.toFixed(2):0;
        // gamma: left to right
        var leftToRight = event.gamma?event.gamma.toFixed(2):0;
        // beta: front back motion
        var frontToBack = event.beta?event.beta.toFixed(2):0;

        handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
    }, true);
}

var handleOrientationEvent = function(frontToBack, leftToRight, rotateDegrees) {
    _rotateY=-rotateDegrees;
    setRotate(_rotateX,_rotateY,_rotateZ);
};