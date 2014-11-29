/*
* Server methods
*/

var twitter = require('./twitter');

module.exports = [

  // Twitter
  {
    name: 'twitter.search',
    fn: twitter.search
  }
];
