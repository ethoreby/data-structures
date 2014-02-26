var makeQueue = function(){
  var instance = {
    storage: {},
    length: 0,
    index: 0
  };
  instance = _.extend(instance, queueMethods);
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
