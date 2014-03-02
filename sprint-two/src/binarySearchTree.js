var makeBinarySearchTree = function(value, depth){
  var newSearchTree = {};
  newSearchTree.value = value || null;
  newSearchTree.left = null;
  newSearchTree.right = null;
  newSearchTree.allValues = [value];
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
        this.left = this.addTree(value, context);
        context.evaluateSize();
      }
    }else if(this.value < value) {
      if(this.right) {
        this.right.insert(value, context);
      }else{
        this.right = this.addTree(value, context);
        context.evaluateSize();
      }
    }
  },

  // possible refactor, move into insert
  addTree: function(value, context) {
    var tree = makeBinarySearchTree(value, this.currentDepth + 1);
    if (context.maxDepth < this.currentDepth + 1) {
      context.maxDepth = this.currentDepth + 1;
    }
    context.allValues.push(value);
    return tree;
  },

  evaluateSize: function() {
    var floor = 1;
    var ceiling = (floor * 2) - 1;
    var minDepth = 0;
    while (this.allValues.length > ceiling) {
      floor *= 2;
      ceiling = (floor * 2) - 1;
      minDepth++;
    }
    if (this.maxDepth > (minDepth * 2)) {
      this.rebalanceTree(this.allValues);
    }
  },

  rebalanceTree: function(allValues) {
    var medianIndex = Math.floor(allValues.length/2);
    var median = allValues.sort()[medianIndex];
    var leftSide = allValues.slice(0, medianIndex);
    var rightSide = allValues.slice(medianIndex + 1);
    var context = this;
    this.left = null;
    this.right = null;
    this.maxDepth = 0;
    this.value = median;
    this.allValues = [median];  //


    var addChildren = function(remainingValues, context) {
      var medianIndex = Math.floor(remainingValues.length/2);
      var median = remainingValues.sort()[medianIndex];
      // var leftSide = allValues.slice(0, medianIndex);
      // var rightSide = allValues.slice(medianIndex + 1);
      var leftSide = remainingValues.slice(0, medianIndex);
      var rightSide = remainingValues.slice(medianIndex + 1);
      context.insert(median);
      if (leftSide.length) {
        addChildren(leftSide, context);
      }
      if (rightSide.length) {
        addChildren(rightSide, context);
      }
    };

    if (leftSide.length) {
      addChildren(leftSide, context);
    }
    if (rightSide.length) {
      addChildren(rightSide, context);
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











