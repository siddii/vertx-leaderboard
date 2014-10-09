/*
 This verticle contains the configuration for our application and co-ordinates
 start-up of the verticles that make up the application.
 */

var container = require('vertx/container');
var console = require('vertx/console');

var webServerConf = {
    port: 8888,
    host: 'localhost',
    "web_root": "."
};

container.deployModule('io.vertx~mod-web-server~2.0.0-final', webServerConf);