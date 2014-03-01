var expect = chai.expect;
var assert = chai.assert;

describe("tree", function() {
  var tree;

  beforeEach(function() {
    tree = makeTree();
  });

  it("should have methods named 'addChild' and 'contains', and a property named 'value'", function() {
    expect(tree.addChild).to.be.a('function');
    expect(tree.contains).to.be.a('function');
    assert.isTrue('value' in tree);
  });

  it("should add children to the tree", function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it("should return true for a value that the tree contains", function(){
    tree.addChild(5);
    assert.isTrue(tree.contains(5));
  });

  it("should return false for a value that was not added", function(){
    tree.addChild(5);
    assert.isFalse(tree.contains(6));
  });

  it("should be able to add children to a tree's child", function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it("should correctly detect nested children", function(){
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    assert.isTrue(tree.contains(7));
    assert.isTrue(tree.contains(8));
  });

  it("should correctly store a reference to the parent", function(){
    tree.addChild(5);
    expect(tree.children[0].parent.value).to.equal(null);
  });

  it("should correctly navigate up through multiple parent references", function(){
    tree.addChild(5);
    tree.children[0].addChild(4);
    tree.children[0].children[0].addChild(3);
    expect(tree.children[0].children[0].children[0].parent.parent.value).to.equal(5);
  });

  it("should correctly remove reference to child from parent", function() {
    tree.addChild(5);
    tree.children[0].removeFromParent();
    expect(tree.children.length).to.equal(0);
  });

  it("should correctly remove reference to parent from child", function() {
    tree.addChild(5);
    var orphan = tree.children[0];
    tree.children[0].removeFromParent();
    expect(orphan.parent).to.equal(null);
  });

});
