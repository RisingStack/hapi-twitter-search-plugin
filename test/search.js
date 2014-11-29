var test = require('tape');
var search = require('../lib/search');

test('search module', function (t) {
  t.plan(2);

  search(function (err, data) {
    t.equal(err, null, 'error should be null');
    t.equal(data, 'bar', 'data should be set');
  });
});
