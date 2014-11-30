# hpi-twitter-search-api

[![Build Status](https://travis-ci.org/RisingStack/hapi-twitter-search-plugin.svg?branch=master)](https://travis-ci.org/RisingStack/hapi-twitter-search-plugin)

## How to use

### GET /
GET /?q=nodejs

### Register as plugin
``` javascript
server.pack.register({
  plugin: plugin,
  options: {
    twitter: {
      key: '..',
      secret: '..',
      token: '..',
      tokenSecret: '..'
    }
  }
});
```

## Test
`npm test`  
`npm run coverage`
