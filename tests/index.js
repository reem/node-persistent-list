var list = require('../lib');
var expect = require('must');

describe('persistent-list', function () {
  it('should exist', function () {
    expect(list).to.exist();
  });

  describe('should have', function () {
    it('a List constructor', function () {
      expect(list.List).to.exist();
    });

    it('a Cons constructor', function () {
      expect(list.Cons).to.exist();
    });

    it('a None constructor', function () {
      expect(list.None).to.exist();
    });
  });

  describe('List', function () {
    it('should be an abstract class', function () {
      expect(function () { return new list.List(); }).to.throw(Error, /abstract class/);
    });
  });

  describe('Cons', function () {
    it('should return a Cons', function () {
      expect(new list.Cons()).to.be.an.instanceof(list.Cons);
    });

    it('should return a List', function () {
      expect(new list.Cons()).to.be.an.instanceof(list.List);
    });

    it('should contain the passed-in head', function () {
      expect(new list.Cons(7, list.empty()).head).to.equal(7);
    });

    it('should construct a linked-list via chaining', function () {
      var l = new list.Cons(7, new list.Cons(5, new list.Cons(4, list.empty())));
      expect(l.toArray()).to.eql([7, 5, 4]);
    });
  });
});

