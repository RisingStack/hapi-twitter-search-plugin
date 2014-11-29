
var routes = require('./routes');
var methods = require('./methods');

exports.register = function (plugin, options, next) {
  plugin.route(routes);
  plugin.method(methods);

  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
