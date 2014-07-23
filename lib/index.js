var _ = require('lodash');
var inherits = require('inherits');

var List = function () {
  if (!(this instanceof Cons || this instanceof None)) {
    throw new Error("List is an abstract class and should not be constructed directly.");
  }
};

var Cons = function (head, tail) {
  if(!(this instanceof Cons)) { return new Cons(head, tail); }
  List.call(this);
  this.head = head;
  this.tail = tail;
};

inherits(Cons, List);

var None = function () {
  List.call(this);
};

inherits(None, List);

var empty = (function () {
  var realempty = new None();
  return function () { return realempty; };
}());

var singleton = function (v) {
  return new Cons(v, empty());
};

List.empty = empty;
List.singleton = singleton;

List.fromArray = function (array) {
  return array.reduceRight(flip(Cons), empty());
};

List.prototype.head = function () { return this.head; };
List.prototype.tail = function () { return this.tail; };

List.prototype.insert = function (val) { return new Cons(val, this); };

List.prototype.each = function (f) {
  if (this.isNone) { return; }
  f(this.head);
  this.tail.each(f);
};

List.prototype.forEach = List.prototype.each;

List.prototype.map = function (f) {
  return this.reduceRight(function (val, acc) {
    return new Cons(f(val), acc);
  }, empty());
};

List.prototype.filter = function (p) {
  return this.reduceRight(function (val, acc) {
    return p(val) ? new Cons(val, acc) : acc;
  }, empty());
};

List.prototype.reject = function (p) {
  return this.filter(function (val) { return !p(val); });
};

List.prototype.reduce = _.curry(function (combiner, start) {
  if (this.isNone()) { return start; }
  else {
    return this.tail.reduce(combiner, combiner(this.head, start));
  }
});

List.prototype.reduceRight = _.curry(function (combiner, start) {
  if (this.isNone()) { return start; }
  else {
    return combiner(this.head, this.tail.reduceRight(combiner, start));
  }
});

List.prototype.toArray = function () {
  return this.reduce(function (val, acc) {
    acc.push(val);
    return acc;
  }, []);
};

List.prototype.length = function () {
  return this.reduce(function (_, length) {
    return length + 1;
  }, 0);
};

List.prototype.isCons = function () { return this instanceof Cons; };

List.prototype.isNone = function () { return this instanceof None; };

module.exports.List = List;
module.exports.Cons  = Cons;
module.exports.None  = None;
module.exports.empty = empty;
module.exports.singleton = singleton;

function flip(f) { return function (b, a) { return f(a, b); }; }

