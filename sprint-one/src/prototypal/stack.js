// var makeStack = function() {
//   // Hey! Copy your code from src/functional-shared/stack.js and paste it here
// };

// var stackMethods = {};

var makeStack = function(length, storage) {
  var instance = Object.create(stackMethods);
  instance.length = length || 0;
  instance.storage = storage || {};
  return instance;
};

var stackMethods = {
  push: function(value){
    this.storage[++this.length] = value;
  },

  pop: function(){
    if(this.storage[this.length] !== undefined) {
      var result = this.storage[this.length];
      delete this.storage[this.length];
      this.length--;
      return result;
    }
  },

  size: function(){
    return this.length;
  }
};

makeStack();
