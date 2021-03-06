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

  describe('None', function () {
    it('should return a None', function () {
      expect(new list.None()).to.be.an.instanceof(list.None);
    });

    it('should return a List', function () {
      expect(new list.None()).to.be.an.instanceof(list.List);
    });

    it('should have length 0', function () {
      expect(new list.None().length()).to.equal(0);
    });
  });

  describe('List.empty', function () {
    it('should return a None', function () {
      expect(list.empty()).to.be.an.instanceof(list.None);
    });

    it('should return the same object every time', function () {
      expect(list.empty()).to.equal(list.empty());
    });
  });

  describe('List.singleton', function () {
    it('should return a Cons', function () {
      expect(list.singleton(5)).to.be.an.instanceof(list.Cons);
    });

    it('should have length 1', function () {
      expect(list.singleton(123).length()).to.equal(1);
    });

    it('should contain the passed in value as head', function () {
      expect(list.singleton(5).head).to.equal(5);
    });

    it('should have a None for a tail', function () {
      expect(list.singleton(5).tail).to.be.an.instanceof(list.None);
    });

    it('should always have the same None as empty for a tail', function () {
      expect(list.singleton(5).tail).to.equal(list.empty());
    });
  });

  describe('List.prototype', function () {
    describe('isCons', function () {
      it('should return true for Cons', function () {
        expect(list.singleton(6).isCons());
      });

      it('should return false for None', function () {
        expect(list.empty().isCons()).to.equal(false);
      });
    });

    describe('isNone', function () {
      it('should return false for Cons', function () {
        expect(list.singleton(6).isNone()).to.equal(false);
      });

      it('should return true for None', function () {
        expect(list.empty().isNone());
      });
    });

    describe('length', function () {
      it('should return the length of a short list', function () {
        expect(list.empty().insert(4).insert(3).insert(2).insert(1).length()).to.equal(4);
      });

      it('should return the length of a long list', function () {
        for (var i = 0, test = []; i < 1000; i++) { test.push(i); }
        expect(list.List.fromArray(test).length()).to.equal(test.length);
      });
    });

    describe('toArray', function () {
      it('should return an array of the elements in a list', function () {
        var sampleList = list.empty().insert(4).insert(3).insert(2).insert(1);
        expect(sampleList.toArray()).to.eql([1, 2, 3, 4]);
      });
    });

    describe('fromArray', function () {
      it('should return a list with all the elements from the array', function () {
        for (var i = 0, test = []; i < 1000; i++) { test.push(i); }
        i = 0;
        list.List.fromArray(test).each(function (val) {
          expect(val).to.equal(i++);
        });
      });
    });

    describe('reduce', function () {
      it('should behave like array.reduce with a flipped combiner', function () {
        for (var i = 0, test = []; i < 1000; i++) { test.push(i); }
        expect(list.List.fromArray(test).reduce(add, 0)).to.equal(test.reduce(add, 0));
      });
    });

    describe('reduceRight', function () {
      it('should behave like reduce for commutative functions', function () {
        for (var i = 0, test = []; i < 1000; i++) { test.push(i); }
        expect(list.List.fromArray(test).reduceRight(list.Cons, list.empty()))
          .to.eql(list.List.fromArray(test));
      });

      it('should reduce from the right', function () {
        for (var i = 0, test = []; i < 1000; i++) { test.push(i); }
        expect(list.List.fromArray(test).reduceRight(add, 0))
          .to.equal(test.reduceRight(add, 0));
      });
    });

    describe('map', function () {
      it('should behave like array.map', function () {
        for (var i = 0, test = []; i < 1000; i++) { test.push(i); }
        expect(list.List.fromArray(test).map(double).toArray()).to.eql(test.map(double));
      });
    });

    describe('filter', function () {
      it('should behave like array.filter', function () {
        for (var i = 0, test = []; i < 1000; i++) { test.push(i); }
        expect(list.List.fromArray(test).filter(isodd).toArray()).to.eql(test.filter(isodd));
      });
    });
  });
});

function add(a, b) { return a + b; }
function double(a) { return a * 2; }
function isodd(a)  { return a % 2; }

