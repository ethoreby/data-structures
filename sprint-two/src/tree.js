// normally, constructor functions have the first letter
// capitalized, but this breaks our test
var makeTree = function(value, parent){
  var newTree = {};
  newTree.value = value || null;
  newTree.children = [];
  newTree.parent = parent || null;
  for (var key in treeMethods) {
    newTree[key] = treeMethods[key];
  }
  return newTree;
};


var treeMethods = {};

treeMethods.addChild = function(value){
  var childTree = makeTree(value, this);
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

treeMethods.removeFromParent = function() {
  var parentsChildren = this.parent.children;
  var index = parentsChildren.indexOf(this);
  this.parent.children = parentsChildren.slice(0, index - 1).concat(parentsChildren.slice(index + 1, parentsChildren.length));
  this.parent = null;
};

  return result;
};
