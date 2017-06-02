var jsscompress = jsscompress || {};

(function(jss){
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
        if(!config.value) {
            config.value = null;
        }
        this.left = config.left;
        this.right = config.right;
        this.freq = config.freq;
        this.key = config.key;
        this.value = config.value;
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
    
    Hauffman.prototype.readTrie = function(bitStream) {
        
    };
    
    jss.Hauffman = Hauffman;

})(jsscompress);

var module = module || {};
if(module) {
	module.exports = jsscompress;
}