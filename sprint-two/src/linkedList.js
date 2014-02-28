var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var node = makeNode(value);
    if(list.tail) {
      list.tail.next = node;
      node.previous = list.tail;
    }
    list.tail = node;

    list.head = list.head || node;
  };

  list.addToHead = function(value){
    var node = makeNode(value);
    node.next = list.head;
    if(list.head) {
      list.head.previous = node;
    }
    list.head = node;

    //
  };

  list.removeTail = function() {
    if(list.tail) {
      var result = list.tail.value;
      var temp = list.tail;
      list.tail = temp.previous;
      list.tail.next = null;
      temp.previous = null;

      return result;
    }
  };

  list.removeHead = function(){
    if(list.head) {
      var result = list.head.value;
      list.head = list.head.next;
      list.head.previous = null;
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
  node.previous = null;

  return node;
};
