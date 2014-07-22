module.exports = {};var _ = require('lodash');
var inherits = require('inherits');

var List = function () {};

var Cons = _.curry(function (head, rest) {
  List.call(this);
  this.head = head;
  this.rest = rest;
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

List.prototype.head = function () { return this.head; };
List.prototype.tail = function () { return this.tail; };

List.prototype.isCons = function () {
  return this instanceof Cons;
};

List.prototype.isNone = function () {
  return this instanceof None;
};
