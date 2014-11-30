# hapi-twitter-search-plugin

[![Build Status](https://travis-ci.org/RisingStack/hapi-twitter-search-plugin.svg?branch=master)](https://travis-ci.org/RisingStack/hapi-twitter-search-plugin)

## How to use

`npm install --save hapi-twitter-search-plugin`

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

### GET /
GET /?q=nodejs

## Test
`npm test`  
`npm run coverage`
