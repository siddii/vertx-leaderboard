'use strict';

var eb = null;

function publish(address, message) {
    initConn();
    eb.publish(address, {text: message});
}

function subscribe(address) {
    initConn();
    eb.registerHandler(address, function (msg, replyTo) {
        console.log('Message = ', msg);
    });
}

function initConn() {
    if (!eb) {
        eb = new vertx.EventBus("/leaderboard");

        eb.onopen = function () {
            console.log('#### Connected');
            subscribe("js-framework");
        };

        eb.onclose = function () {
            console.log('#### Closed');
            eb = null;
        };
    }
}

$(function (){
    $('.btn-add').click(function (){
        var val = $('.txt-framework').val();
        publish("js-framework", val);
    });
    initConn();
});


