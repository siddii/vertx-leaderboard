'use strict';

var eventBus = null;
var address = "js-frameworks";

function publish(message) {
    initConn();
    eventBus.publish(address, {text: message});
}

function subscribe(cb) {
    initConn();
    eventBus.registerHandler(address, function (response) {
        cb(response);
    });
}

function initConn(cb) {
    if (!eventBus) {
        eventBus = new vertx.EventBus("/leaderboard");

        eventBus.onopen = function () {
            console.log('Eventbus Connected!');
            subscribe(cb);
        };

        eventBus.onclose = function () {
            console.log('Eventbus Closed');
            eventBus = null;
        };
    }
}