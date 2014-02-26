var makeStack = function() {
  // Hey! Copy your code from src/functional/stack.js and paste it here
  var instance = {storage: {}, length: 0};
  instance = _.extend(instance, stackFunctions);
  return instance;
};

var stackFunctions = {
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
