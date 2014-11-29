
var routes = require('./routes');

exports.register = function (plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/',
    handler: routes.search
  });

  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
