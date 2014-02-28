var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.children = [];
  for (var key in treeMethods) {
    newTree[key] = treeMethods[key];
  }
  return newTree;
};


var treeMethods = {};

treeMethods.addChild = function(value){
  var childTree = makeTree(value);
  this.children.push(childTree);
};

treeMethods.contains = function(target){
  if (this.value === target) {
    return true;
  } else if (this.children.length === 0) {
    return false;
  }

  var result = false;
  for(var i = 0; i < this.children.length; i++) {
    if(this.children[i].contains(target)) {
      result = true;
      break;
    }
  }

  return result;
};
