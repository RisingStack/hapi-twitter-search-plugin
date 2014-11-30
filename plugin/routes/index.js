/*
* Routes
*/

var joi = require('joi');
var twitter = require('./twitter');

module.exports = [

  /* *** Twitter *** */

  // Search
  {
    method: 'GET',
    path: '/',
    handler: twitter.search,
    config: {
      validate: {
        query: {
          q: joi.string().min(1)
        }
      }
    }
  }
];
