var HashTable = function(){
  this._limit = 8;
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (!this._storage[i]) {
    this._storage[i] = [];
  }
  this._storage[i].push([k, v]);
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage[i];
  if (!bucket) {
    return null;
  }
  var current;
  for (var j = 0; j < bucket.length; j++) {
    current = bucket[j];
    if (current[0] === k) {
      return current[1];
    }
  }
  return null;
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  this._storage[i] = null;
};
