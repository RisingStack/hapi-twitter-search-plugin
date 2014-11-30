/*
 * Twitter server method
 */

var twitter = require('node-twitter');


/*
* Search
*
* @method search
* @callback next
*/
function search (config, query, next) {
  var client = new twitter.SearchClient(
    config.key,
    config.secret,
    config.token,
    config.tokenSecret
  );

  client.search({
    q: query
  }, function(err, result) {
    if (err) {
      return next(err);
    }

    var tweets = result.statuses.map(function (status) {
      return {
        createdAt: new Date(status.created_at),
        text: status.text
      };
    });

    next(err, tweets);
  });
}


// Interface
exports.search = search;
