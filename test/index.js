var test = require('tape');
var hapi = require('hapi');

var plugin = require('../');
var server = new hapi.Server(3001);

server.pack.register({ plugin: plugin }, function(err) {
  if (err) {
    throw err;
  }
});

test('GET /', function (t) {
  t.plan(2);

  var options = {
    method: 'GET',
    url: '/'
  };

  server.inject(options, function(res) {
    t.equal(res.statusCode, 200, 'status code should be 200');
    t.deepEqual(res.result, { foo: 'bar' }, 'result should be equal');
  });
});
