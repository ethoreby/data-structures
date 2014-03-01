var HashTable = function(){
  this._limit = 8;
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var size;
  var capacity;
  if (!this._storage[i]) {
    this._storage[i] = [];
  }
  this._storage[i].push([k, v]);
  size = this.size();
  capacity = size / this._limit;
  if (capacity >= 0.75) {
    this.doubleCapacity();
  }
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage[i];
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
  this._storage[i] = null;
  size = this._storage.length;
  capacity = size / this._limit;
  if (capacity <= 0.25) {
    halfCapacity();
  }
};

HashTable.prototype.size = function(){
  var result = 0;
  this._storage.each(function(bucket){
    if (bucket) {
      result++;
    }
  });
  return result;
};

HashTable.prototype.doubleCapacity = function(){
  this._limit *= 2;

  var callback = function(bucket, currentHash) {
    if (bucket) {
      bucket.forEach(function(item) {
        var newHash = getIndexBelowMaxForKey(item[0], this._limit);
        if (currentHash !== newHash) {
          var index = bucket.indexOf[item];
          bucket = bucket.slice(0, index - 1).concat(bucket.slice(index + 1, bucket.length));
          this._storage[newHash].push(item);
        }
      });
    }
  };

  this._storage.each(callback);
};

HashTable.prototype.halfCapacity = function(){
};
