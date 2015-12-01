var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('./application/views/index.html');
    }
});

server.register([
  { register: require('vision') },
  { register: require('inert') }
], function (err) {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'application/assets',
                listing: true
            }
        }
    });

    server.start(function() {
        console.log('Mirror running at:', server.info.uri);
    });

});
