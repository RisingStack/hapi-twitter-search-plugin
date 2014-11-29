var test = require('tape');
var sinon = require('sinon');

var hapi = require('hapi');

var plugin = require('../');
var server = new hapi.Server(3001);
var mockedTweets = [
  { createdAt: new Date(0), text: 'Hello' },
  { createdAt: new Date(1), text: 'World' }
];

server.pack.register({ plugin: plugin }, function(err) {
  if (err) {
    throw err;
  }
});

// Mock server method
function mockTwitterSearch () {
  return sinon.stub(server.methods.twitter, 'search', function (query, next) {
    next(null, mockedTweets);
  });
}

test('GET /?q=node', function (t) {
  var searchStub = mockTwitterSearch();

  t.plan(3);

  var options = {
    method: 'GET',
    url: '/?q=node'
  };

  server.inject(options, function(res) {
    t.equal(searchStub.getCall(0).args[0], 'node', 'mocked server method should be called with "node"');
    t.equal(res.statusCode, 200, 'status code should be 200');
    t.deepEqual(res.result, { tweets: mockedTweets }, 'result should contain tweets');

    searchStub.restore();
  });
});
