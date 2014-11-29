/*
* Routes
*/

var twitter = require('./twitter');

module.exports = [

  /* *** Twitter *** */

  // Search
  {
    method: 'GET',
    path: '/',
    handler: twitter.search
  }
];
