var searchTweets = require('./search');

/*
 * Search
 *
 * @method search
 */
function search (request, reply) {
  searchTweets(function (err, data) {
    reply({ foo: data });
  });
}

exports.search = search;
