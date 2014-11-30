var test = require('tape');
var nock = require('nock');

var method = require('../../plugin/methods/twitter');

var mockedTweets = [
  { createdAt: new Date(0), text: 'Hello' },
  { createdAt: new Date(1), text: 'World' }
];

test('methods/twitter', function (m) {
  m.plan(2);

  m.test('returns with tweets', function (t) {
    nock('https://api.twitter.com:443')
      .get('/1.1/search/tweets.json?q=wow')
      .once()
      .reply(200, {
        statuses: [
          { created_at: mockedTweets[0].createdAt, text: mockedTweets[0].text },
          { created_at: mockedTweets[1].createdAt, text: mockedTweets[1].text }
        ]
      });

    t.plan(2);

    method.search({ foo: 'bar' }, 'wow', function(err, data) {
      t.equal(err, undefined, 'err should be undefined');
      t.deepEqual(data, mockedTweets, 'result should contain tweets');
    });
  });

  m.test('returns with error', function (t) {
    nock('https://api.twitter.com:443')
    .get('/1.1/search/tweets.json?q=wow')
    .once()
    .reply(215, {
      errors: [{ message: 'Bad Authentication data', code: 215 }]
    });

    t.plan(1);

    method.search({ foo: 'bar' }, 'wow', function(err, data) {
      t.deepEqual(err, { code: 215 }, 'err should exists');
    });
  });
});
