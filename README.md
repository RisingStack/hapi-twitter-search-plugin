# hpi-twitter-search-api

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
