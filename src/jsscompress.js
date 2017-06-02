var jsscompress = jsscompress || {};

(function(jss){
    jss.exchange = function(a, i, j) {
        var temp = a[i];
        a[i]  = a[j];
        a[j] = temp;
    };
    
    var HauffNode = function(config) {
        var config = config || {};
        if(!config.left) {
            config.left = null;
        }
        if(!config.right) {
            config.right = null;
        }
        if(!config.freq) {
            config.freq = 0;
        }
        if(!config.key) {
            config.key = 0;
        }
        this.left = config.left;
        this.right = config.right;
        this.freq = config.freq;
        this.key = config.key;
    };
    
    HauffNode.prototype.isLeaf = function(){
        return this.left == null && this.right == null;
    };
    
    jss.HauffNode = Hauffman;
    var Hauffman = function(){
        this.root = null;
    };
    
    var QueueNode = function(item) {
        this.value = item;
        this.next = null;
    };
    
    jss.QueueNode = QueueNode;
    
    var Queue = function() {
        this.first = null;
        this.last = null;
        this.N = 0;
    };
    
    Queue.prototype.enqueue = function(item) {
        var oldLast = this.last;
        this.last = new jss.QueueNode(item);
        if(oldLast != null) {
            oldLast.next = this.last;
        }
        if(this.first == null) {
            this.first = this.last;
        }
        this.N++;
    };
    
    Queue.prototype.dequeue = function(){
        var oldFirst = this.first;
        if(oldFirst == null) {
            return undefined;
        }
        var item = oldFirst.value;
        this.first = oldFirst.next;
        if(this.first == null) {
            this.last = null;
        }
        this.N--;
        return item;
    };
    
    Queue.prototype.size = function() {
        return this.N;
    };
    
    Queue.prototype.isEmpty = function() {
        return this.N == 0;
    };
    
    jss.Queue = Queue;
    
    var MinPQ = function(compare) {
        this.s = [];
        this.N = 0;
        if(!compare) {
            compare = function(a1, a2) {
                return a1 - a2;
            };
        }
        this.compare = compare;
    };
    
    MinPQ.prototype.enqueue = function(item) {
        if(this.N+1 >= this.s.length) {
            this.resize(this.s.length * 2);
        }
        this.s[++this.N] = item;
        this.swim(this.N);
    };
    
    MinPQ.prototype.delMin = function() {
        if(this.N == 0) {
            return undefined;
        }  
        var item = this.s[1];
        jss.exchange(this.s, 1, this.N--);
        this.sink(1);
        if(this.N == Math.floor(this.s.length / 4)){
            this.resize(Math.floor(this.s.length / 2));
        }
        return item;
    };
    
    MinPQ.prototype.sink = function(k) {
        while(k * 2 <= this.N) {
            var child = k * 2;
            if(child < this.N && this.compare(this.s[child+1], this.s[child]) < 0){
                child += 1;
            }
            if(this.compare(this.s[child], this.s[k]) < 0) {
                jss.exchange(this.s, child, k);
                k = child;
            } else {
                break;
            }
        }  
    };
    
    MinPQ.prototype.size = function() {
        return this.N;
    };
    
    MinPQ.prototype.isEmpty = function() {
        return this.N == 0;
    };
    
    MinPQ.prototype.resize = function(len) {
        var temp = [];
        for(var i = 0; i < len; ++i) {
            if(i < this.s.length){
                temp.push(this.s[i]);
            } else {
                temp.push(0);
            }
        }
        this.s = temp;
    };
    
    MinPQ.prototype.swim = function(k) {
        while(k > 1) {
            parent = Math.floor(k / 2);
            if(this.compare(this.s[k], this.s[parent]) < 0) {
                jss.exchange(this.s, k, parent);
                k = parent;
            } else {
                break;
            }
        }  
    };
    jss.MinPQ = MinPQ;
    
    Hauffman.prototype.readTrie = function(bitStream) {
        var bit = bitStream.dequeue();
        if(bit == 1){
            return new jss.HauffNode({
                key: this.readChar(bitStream)
            });
        }
        var left = this.readTrie(bitStream);
        var right = this.readTrie(bitStream);
        return new jss.HauffNode({
            left : left,
            right : right
        });
    };
    
    Hauffman.prototype.readChar = function(bitStream) {
        
        var cc = 0;
        for(var i = 0; i < 8; ++i) {
            cc = cc * 2 + bitStream.dequeue();
        }  
        return cc;
    };
    
    Hauffman.prototype.writeChar = function(cc, bitStream) {
        for(var i = 0; i < 8; ++i) {
            var bit = cc % 2;
            bitStream.enqueue(bit);
            cc = Math.floor(cc / 2);
        }  
    };
    
    Hauffman.prototype.writeTrie = function(x, bitStream) {
        if(x.isLeaf()){
            bitStream.enqueue(1);
            this.writeChar(x.key, bitStream);
            return;
        }
        bitStream.enqueue(0);
        this.writeTrie(x.left, bitStream);
        this.writeTrie(x.right, bitStream);
    };  
    
    jss.Hauffman = Hauffman;

})(jsscompress);

var module = module || {};
if(module) {
	module.exports = jsscompress;
}