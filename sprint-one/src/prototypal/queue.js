var makeQueue = function(length, storage) {
  var instance = Object.create(queueMethods);
  instance.storage = storage || {};
  instance.length = length || 0;
  instance.index = length || 0;
  return instance;
};

var queueMethods = {
    enqueue: function(value){
    this.storage[this.index++] = value;
    this.length++;
  },

  dequeue: function(){
    if(this.length > 0) {
      var earliestIndex = Object.keys(this.storage).sort()[0];
      var result = this.storage[earliestIndex];
      delete this.storage[earliestIndex];
      this.length--;
      return result;
    }
  },

  size: function(){
    return this.length;
  }
};
