seajs.use(["common"], function(common) {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;


	var Vector = function (x, y){
		this.x = x;
		this.y = y;
	};

	//加
	Vector.prototype.add = function (V) {
		var v = new Vector(this.x, this.y);
		v.x += V.x;
		v.y += V.y;
		return v;
	}

	//减
	Vector.prototype.subtract = function (V){
		var v = new Vector(this.x, this.y);
		v.x -= V.x;
		v.y -= V.y;
		return v;
	}

	//点乘
	Vector.prototype.dotMultiply = function (){
		return this.x * this.x + this.y * this.y;
	}

	//向量值
	Vector.prototype.value = function () {
		return Math.sqrt(this.dotMultiply());
	}

	//单位向量
	Vector.prototype.normalize = function (){
		var _M = this.value();
		var _x = this.x / _M, _y = this.y / _M;
		return new Vector(_x, _y);
	}

	//法向量
	Vector.prototype.perpendicular = function () {
		var x = this.y;
		var y = -this.x;
		return new Vector(x, y);
	}

	//单位法向量
	Vector.prototype.normalPerpendicular = function () {
		var _v = this.perpendicular();
		return _v.normalize();
	}

	function Polygon() {
		this.points = [];
        this.vectors = [];
	}
    Polygon.prototype.render = function(){
        console.log(this.vectors);
        if(this.getPointLength() < 3){
            return;
        }
        this.points.forEach(function(point, index){
            if(index === 0){
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.strokeStyle = "#f00";
                ctx.lineTo(point.x , point.y);
                ctx.stroke();
            }
        });
        ctx.closePath();
        ctx.stroke();
        ctx.restore;
    }
    Polygon.prototype.addPoint = function(point){
        var len = this.getPointLength();
        this.points.push(point);
    }
    Polygon.prototype.getPointLength = function(){
        return this.points.length;
    }
    Polygon.prototype.initVector = function () {
        var len = this.getPointLength();
        if(len >= 3){
            for(var i = 0 ; i < len - 1; i++){
                var res = this.points[i].subtract(this.points[i + 1]);
                res = res.normalPerpendicular();
                this.vectors.push(res);
            }
            res = this.points[i].subtract(this.points[0]);
            res = res.normalPerpendicular();
            this.vectors.push(res);
        }
    }
    Polygon.prototype.getShadow = function(axis){
        var shadows = [];
        this.points.forEach(function (point) {
            var res = point.dotMultiply(axis);
            shadows.push(res);
        });
        return [Math.min.apply(Math, shadows), Math.max.apply(Math, shadows)];
    }


    var Util = {
        getOverlap: function (arrayA, arrayB) {
            return arrayA[0] < arrayB[1] && arrayA[1] > arrayB[0];
        },
        concatAxis: function (axis1, axis2){
            return axis1.concat(axis2);
        }
    }
    var p1 = new Polygon();
	p1.addPoint(new Vector(20, 30));
	p1.addPoint(new Vector(125, 4));
	p1.addPoint(new Vector(50, 90));
    p1.initVector();
	p1.render();

	var p2 = new Polygon();
	p2.addPoint(new Vector(120, 20));
	p2.addPoint(new Vector(140, 40));
	p2.addPoint(new Vector(150, 100));
	p2.addPoint(new Vector(120, 80));
    p2.initVector();
	p2.render();

    var axiss = Util.concatAxis(p1.vectors, p2.vectors);
    axiss.forEach(function(axis){
        var res1 = p1.getShadow(axis);
        var res2 = p2.getShadow(axis);
        if(Util.getOverlap(res1, res2)){
            console.log("conlision!");
            return;
        }
    });
	// (function drawFrame() {
	// 	requestAnimationFrame(drawFrame);
	// 	ball.render(ctx);
	// })();

})
