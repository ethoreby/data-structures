var Stack = function(length,storage) {
  this.length = length || 0;
  this.storage = storage || {};
};

Stack.prototype.push = function(value) {
  this.storage[++this.length] = value;
};

Stack.prototype.pop = function() {
  if(this.storage[this.length] !== undefined) {
    var result = this.storage[this.length];
    delete this.storage[this.length];
    this.length--;
    return result;
  }
};

Stack.prototype.size = function() {
  return this.length;
};

var stack = new Stack();
