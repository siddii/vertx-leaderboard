'use strict';

var eb = null;
var address = "js-framework";

function publish(message) {
    initConn();
    eb.publish(address, {text: message});
}

function subscribe(cb) {
    initConn();
    eb.registerHandler(address, function (response) {
        cb(response);
    });
}

function initConn(cb) {
    if (!eb) {
        eb = new vertx.EventBus("/leaderboard");

        eb.onopen = function () {
            console.log('#### Connected');
            subscribe(cb);
        };

        eb.onclose = function () {
            console.log('#### Closed');
            eb = null;
        };
    }
}