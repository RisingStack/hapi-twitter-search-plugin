exports.register = function (plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply({ foo: 'bar' });
    }
  });

  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
