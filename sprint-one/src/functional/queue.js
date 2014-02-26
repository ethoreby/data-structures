var makeQueue = function(){
  var instance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;
  var index = 0;

  // Implement the methods below

  instance.enqueue = function(value){
    storage[index++] = value;
    size++;
  };

  instance.dequeue = function(){
    if(size > 0) {
      var earliestIndex = Object.keys(storage).sort()[0];
      var result = storage[earliestIndex];
      delete storage[earliestIndex];
      size--;
      return result;
    }

  };

  instance.size = function(){
    return size;
  };

  return instance;
};
