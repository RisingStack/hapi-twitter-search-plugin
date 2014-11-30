var test = require('tape');
var sinon = require('sinon');

var route = require('../../plugin/routes/twitter');



// Mock server method
function mockRequest () {
  var request = {
    query: {
      q: 'foo'
    },
    server: {
      methods: {
        twitter: {
          search: sinon.spy(function (config, query, done) {
            done(null, [1,2,3]);
          })
        }
      },
      settings: {
        app: {
          twitter: {}
        }
      }
    }
  };

  return request;
}

test('routes/twitter', function (r) {
  r.plan(1);

  r.test('search', function (t) {
    var request = mockRequest();

    t.plan(2);

    route.search(request, function(data) {
      t.equal(request.server.methods.twitter.search.getCall(0).args[1],
      'foo', 'should call "twitter.search" server method');

      t.deepEqual(data, { tweets: [1,2,3] }, 'should have result');
    });
  });
});
