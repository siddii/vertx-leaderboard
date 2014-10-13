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
sockJSServer.bridge({prefix: "/leaderboard"}, [{}], [{}]);

server.listen(9090);