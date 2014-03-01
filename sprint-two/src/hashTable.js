var HashTable = function(){
  this._limit = 8;
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var size;
  var capacity;
  if (!this._storage.get(i)) {
    this._storage.set(i, []);
  }
  this._storage.get(i).push([k, v]);
  size = this.getSize();
  capacity = size / this._limit;
  if (capacity >= 0.75) {
    this._limit *= 2;
    this.rebuildStorage();
  }
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(i);
  var current;
  if (!bucket) {
    return null;
  }
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
  var size;
  var capacity;
  this._storage.set(i, null);
  size = this.getSize();
  capacity = size / this._limit;
  if (capacity <= 0.25) {
    this._limit /= 2;
    this.rebuildStorage();
  }
};

HashTable.prototype.getSize = function(){
  var result = 0;
  this._storage.each(function(bucket){
    if (bucket) {
      result++;
    }
  });
  return result;
};

HashTable.prototype.rebuildStorage = function(){
  var context = this;

  var oldLimitedArray = this._storage;
  this._storage = makeLimitedArray(this._limit);
  var callback = function(bucket, currentHash) {
    if (bucket) {
      bucket.forEach(function(item) {
        var newHash = getIndexBelowMaxForKey(item[0], this._limit);
        context.insert(item[0], item[1]);
      });
    }
  };

  oldLimitedArray.each(callback);
};
