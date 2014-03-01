var makeBinarySearchTree = function(value, depth){
  var newSearchTree = {};
  newSearchTree.value = value || null;
  newSearchTree.left = null;
  newSearchTree.right = null;
  newSearchTree.size = 1;
  newSearchTree.currentDepth = depth || 0;
  newSearchTree.maxDepth = 0;

  for (var key in binarySearchTreeMethods) {
    newSearchTree[key] = binarySearchTreeMethods[key];
  }

  return newSearchTree;
};

//maybe refactor to a 'finder' function as a helper to insert and contains

var binarySearchTreeMethods = {
  // refactor to make more DRY
  insert: function(value, context) {
    context = context || this;

    if(this.value > value) {
      if(this.left) {
        this.left.insert(value, context);
      }else{
        this.left = makeBinarySearchTree(value, this.currentDepth + 1);
        if (context.maxDepth < this.currentDepth + 1) {
          context.maxDepth = this.currentDepth + 1;
        }
        context.size++;
        context.evaluateSize();
      }
    }else if(this.value < value) {
      if(this.right) {
        this.right.insert(value, context);
      }else{
        this.right = makeBinarySearchTree(value, this.currentDepth + 1);
        if (context.maxDepth < this.currentDepth + 1) {
          context.maxDepth = this.currentDepth + 1;
        }
        context.size++;
        context.evaluateSize();
      }
    }
  },

  evaluateSize: function() {
    var floor = 1;
    var ceiling = (floor * 2) - 1;
    var minDepth = 0;
    while (this.size > ceiling) {
      floor *= 2;
      ceiling = (floor * 2) - 1;
      minDepth++;
    }
    if (this.maxDepth >= (minDepth * 2)) {
      console.log('new depth: ' + minDepth);
      // this.rebalanceTree();
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
  },

  breadthFirstLog: function() {
    console.log(this);
    if (this.left) {
      this.left.breadthFirstLog();
    }
    if (this.right) {
      this.right.breadthFirstLog();
    }
  }

};











