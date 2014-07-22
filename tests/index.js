var list = require('../lib');
var demand = require('must');

describe('persistent-list', function () {
  it('should exist', function () {
    demand(list).to.exist();
  });
});
