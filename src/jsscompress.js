var jsscompress = jsscompress || {};

(function(jss){
    var Vector = function(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    };
    
    Vector.prototype.add = function(that){
        return new Vector(
            this.x + that.x,
            this.y + that.y,
            this.z + that.z 
        );  
    };
    
    Vector.prototype.scale = function(val) {
        return new Vector(
            this.x * val,
            this.y * val,
            this.z * val
        );  
    };
    
    Vector.prototype.minus = function(that) {
        return new Vector(
            this.x - that.x,
            this.y - that.y,
            this.z - that.z
        );
    };
    
    Vector.prototype.distance = function(that){
        return Math.sqrt(
            Math.pow(this.x - that.x, 2.0) + 
            Math.pow(this.y - that.y, 2.0) +
            Math.pow(this.z - that.z, 2.0)
        );
    };
    
    jss.Vector = Vector;
    
	var BSpline = function(config){
        var config = config || {};
        if(!config.steps){
            config.steps = 100;
        }
        this.steps = config.steps;
        this.way_points = [];
        this.nodes = [];
        this.distances = [];
    };
    
    BSpline.prototype.addWayPoint = function(pt) {
        this.way_points.push(new jss.Vector(pt.x, pt.y, pt.z));
        if(this.way_points.length > 3) {
            var j = this.way_points.length - 1;
            for(var i=0; i < this.steps; ++i){
                var u = i * 1.0 / this.steps;
                var node = this.interpolate(u, this.way_points[j-3], this.way_points[j-2], this.way_points[j-1], this.way_points[j]);
                var distance = 0;
                if(this.nodes.length > 0){
                    distance = this.distances[this.distances.length-1] + node.distance(this.nodes[this.nodes.length-1]);
                }
                this.nodes.push(node);
                this.distances.push(distance);
            }
        }
    };
    
    BSpline.prototype.interpolate = function(u, pt1, pt2, pt3, pt4) {
        var point = pt1.scale(-1).add(pt2.scale(3)).minus(pt3.scale(3)).add(pt4).scale(u*u*u / 6);
        point = point.add(pt1.scale(3).minus(pt2.scale(6)).add(pt3.scale(3)).scale(u*u / 6));
        point = point.add(pt1.scale(-3).add(pt2.scale(3)).scale(u / 6));
        point = point.add(pt1.add(pt2.scale(4)).add(pt3).scale(1.0 / 6));
        return point;
    };
    
    Bezier = function(config) {
        var config = config || {};
        if(!config.steps){
            config.steps = 100;
        }
        this.steps = config.steps;
        this.way_points = [];
        this.nodes = [];
        this.distances = [];
    };
    
    Bezier.prototype.addWayPoint = function(pt) {
        this.way_points.push(new jss.Vector(pt.x, pt.y, pt.z));
        if(this.way_points.length > 3) {
            var j = this.way_points.length - 1;
            if(j % 2 == 0) return;
            
            for(var i=0; i < this.steps; ++i){
                var u = i * 1.0 / this.steps;
                var node;
                if(j == 3){
                    node = this.interpolate(u, this.way_points[j-3], this.way_points[j-2], this.way_points[j-1], this.way_points[j]);
                } else {
                    k = j - 2;
                    pt4 = this.way_points[k].scale(2).minus(this.way_points[k-1]);
                    node = this.interpolate(u, this.way_points[k], pt4, this.way_points[k+1], this.way_points[k+2]);
                }
                var distance = 0;
                if(this.nodes.length > 0){
                    distance = this.distances[this.distances.length-1] + node.distance(this.nodes[this.nodes.length-1]);
                }
                this.nodes.push(node);
                this.distances.push(distance);
            }
        }
    };
    
    Bezier.prototype.interpolate = function(u, pt1, pt2, pt3, pt4){
        var point = pt1.scale(-1).add(pt2.scale(3)).minus(pt3.scale(3)).add(pt4).scale(u*u*u);
        point = point.add(pt1.scale(3).minus(pt2.scale(6)).add(pt3.scale(3)).scale(u*u));
        point = point.add(pt1.scale(-3).add(pt2.scale(3)).scale(u));
        point = point.add(pt1);
        return point;
    };

    jss.BSpline = BSpline;
    jss.Bezier = Bezier;

})(jsscompress);

var module = module || {};
if(module) {
	module.exports = jsscompress;
}