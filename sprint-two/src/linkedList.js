var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var node = makeNode(value);
    if(list.tail) {
      list.tail.next = node;
    }
    list.tail = node;

    list.head = list.head || node;
  };

  list.removeHead = function(){
    if(list.head) {
      var result = list.head.value;
      list.head = list.head.next;
      return result;
    }
  };

  list.contains = function(target, node){
    node = node || list.head;
    if(node.value === target) {
      return true;
    } else if (node.next === null) {
      return false;
    }

    return list.contains(target, node.next);
  };

  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};
