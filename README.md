# persistent-list [![Build Status](https://secure.travis-ci.org/reem/node-persistent-list.png?branch=master)](https://travis-ci.org/reem/node-persistent-list)

> A persistent, singly linked list, similar to Haskell's `[a]` type.

## Install

```bash
npm install --save persistent-list
```

## Examples

```javascript
var list = require('persistent-list');

var a = list.empty();
var b = a.insert(5);
b.toArray() === [5];
a.toArray() === [];
```

## API

### `List.prototype.`
- `reduce`
- `each`/`forEach`
- `map`
- `filter`/`reject`
- `toArray`
- `length`
- `isCons`/`isNone`

## License

MIT
