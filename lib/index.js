var _ = require('lodash');
var inherits = require('inherits');

var List = function () {};

var Cons = _.curry(function (head, tail) {
  List.call(this);
  this.head = head;
  this.tail = tail;
});

inherits(Cons, List);

var None = function () {
  List.call(this);
};

inherits(None, List);

var empty = (function () {
  var realempty = new None();
  return function () { return realempty; };
}());

var singleton = new Cons(_, empty());

List.empty = empty;
List.singleton = singleton;

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
  if (this.isNone) {
    return this;
  } else {
    return new Cons(f(this.head), this.tail.map(f));
  }
};

List.prototype.filter = function (p) {
  if (this.isNone) {
    return this;
  } else {
    return p(this.head) ? new Cons(this.head, this.tail.filter(p)) : this.tail.filter(p);
  }
};

List.prototype.reject = function (p) {
  return this.filter(function (val) { return !p(val); });
};

List.prototype.reduce = _.curry(function (combiner, start) {
  if (this.isNone) { return this; }
  else {
    return this.tail.reduce(combiner, combiner(this.head, start));
  }
});

List.prototype.isCons = function () { return this instanceof Cons; };

List.prototype.isNone = function () { return this instanceof None; };

module.exports.List = List;
module.exports.Cons  = Cons;
module.exports.None  = None;
module.exports.empty = empty;
module.exports.singleton = singleton;

