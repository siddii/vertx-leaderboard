'use strict';

var vertx = require('vertx');

var server = vertx.createHttpServer();
var console = require('vertx/console');

// Serve the static resources
server.requestHandler(function (req) {
    var uri = req.uri();
    if (uri == "/") req.response.sendFile("index.html");
    if (uri && (uri.indexOf('js') !== -1 || uri.indexOf('.css') !== -1)) {
        req.response.sendFile(uri.substring(1));
    }
});

var sockJSServer = vertx.createSockJSServer(server);
// Create a SockJS bridge which lets everything through (be careful!)
sockJSServer.bridge({prefix: "/leaderboard"}, [
    {}
], [
    {}
]);

sockJSServer.on('socket-created', function () {
    console.log('Leaderboard server socket created...');
});

server.listen(9090);