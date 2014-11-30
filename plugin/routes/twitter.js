
/*
* Search
*
* @method search
*/
function search (request, reply) {
  var twitterSearch = request.server.methods.twitter.search;
  var config = request.server.settings.app.twitter;

  var query = request.query.q;

  twitterSearch(config, query, function (err, tweets) {
    reply({ tweets: tweets });
  });
}

// Interface
exports.search = search;
