var test = require('tape');
var sinon = require('sinon');
var nock = require('nock');

var hapi = require('hapi');

var plugin = require('../');
var server = new hapi.Server({
  app: { twitter: { foo: 1 } }
});

var mockedTweets = [
  { createdAt: new Date(0), text: 'Hello' },
  { createdAt: new Date(1), text: 'World' }
];

server.pack.register({
  plugin: plugin,
  options: {
    twitter: { foo: 1 }
  }
}, function(err) {
  if (err) {
    throw err;
  }
});

// Mock server method
function mockTwitterSearch () {
  return sinon.stub(server.methods.twitter, 'search', function (config, query, next) {
    next(null, mockedTweets);
  });
}

test('GET /?q=node', function (t) {
  nock('https://api.twitter.com:443')
  .get('/1.1/search/tweets.json?q=node')
  .once()
  .reply(200, {
    statuses: [
      { created_at: mockedTweets[0].createdAt, text: mockedTweets[0].text },
      { created_at: mockedTweets[1].createdAt, text: mockedTweets[1].text }
    ]
  });

  t.plan(2);

  var options = {
    method: 'GET',
    url: '/?q=node'
  };

  server.inject(options, function(res) {
    t.equal(res.statusCode, 200, 'status code should be 200');
    t.deepEqual(res.result, { tweets: mockedTweets }, 'result should contain tweets');
  });
});

test('GET /?q=node mocked server method', function (t) {
  var searchStub = mockTwitterSearch();

  t.plan(3);

  var options = {
    method: 'GET',
    url: '/?q=mocked'
  };

  server.inject(options, function(res) {
    t.equal(searchStub.getCall(0).args[1], 'mocked', 'mocked server method should be called with "node"');
    t.equal(res.statusCode, 200, 'status code should be 200');
    t.deepEqual(res.result, { tweets: mockedTweets }, 'result should contain tweets');

    searchStub.restore();
  });
});
