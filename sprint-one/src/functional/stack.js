var makeStack = function(){
  var instance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0; // Hint: set an initial value here

  // Implement the methods below
  instance.push = function(value){
    storage[++size] = value;
  };

  instance.pop = function(){
    if(storage[size] !== undefined) {
      var result = storage[size];
      delete storage[size];
      size--;
      return result;
    }
  };

  instance.size = function(){
    return size;
  };

  return instance;
};
