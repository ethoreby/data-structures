var makeBinarySearchTree = function(value){
  var newSearchTree = {};
  newSearchTree.value = value || null;
  newSearchTree.left = null;
  newSearchTree.right = null;

  for (var key in binarySearchTreeMethods) {
    newSearchTree[key] = binarySearchTreeMethods[key];
  }

  return newSearchTree;
};

//maybe refactor to a 'finder' function as a helper to insert and contains

var binarySearchTreeMethods = {
  insert: function(value) {
    if(this.value > value) {
      if(this.left) {
        this.left.insert(value);
      }else{
        this.left = makeBinarySearchTree(value);
      }
    }else if(this.value < value) {
      if(this.right) {
        this.right.insert(value);
      }else{
        this.right = makeBinarySearchTree(value);
      }
    }
  },

  contains: function(target) {
    var found = false;
    var current = this;

    while(!found && current !== null) {
      if(target < current.value) {
        current = current.left;
      }else if(target > current.value) {
        current = current.right;
      }else{
        found = true;
      }
    }
    return found;
  },

  depthFirstLog: function(callback) {
    callback(this.value);

    if(this.left) {
      this.left.depthFirstLog(callback);
    }
    if(this.right) {
      this.right.depthFirstLog(callback);
    }
  }
};
