var Queue = function(length, storage) {
  this.storage = storage || {};
  this.length = length || 0;
  this.index = length || 0;
};

Queue.prototype.enqueue = function(value) {
  this.storage[this.index++] = value;
  this.length++;
};

Queue.prototype.dequeue = function() {
  if(this.length > 0) {
    var earliestIndex = Object.keys(this.storage).sort()[0];
    var result = this.storage[earliestIndex];
    delete this.storage[earliestIndex];
    this.length--;
    return result;
  }
};

Queue.prototype.size = function() {
  return this.length;
};

var queue = new Queue();
