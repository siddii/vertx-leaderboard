'use strict';

var eb = null;

function publish(address, message) {
    if (eb) {
        var json = {text: message};
        eb.publish(address, json);
        $('#sent').append($("<code>").text("Address:" + address + " Message:" + message));
        $('#sent').append($("</code><br>"));
    }
}

function subscribe(address) {
    if (eb) {
        eb.registerHandler(address, function (msg, replyTo) {
            $('#received').append("Address:" + address + " Message:" + msg.text + "<br>");
        });
        $('#subscribed').append($("<code>").text("Address:" + address));
        $('#subscribed').append($("</code><br>"));
    }
}

function closeConn() {
    if (eb) {
        eb.close();
    }
}

function openConn() {
    if (!eb) {
        eb = new vertx.EventBus("/leaderboard");

        eb.onopen = function () {
            console.log('#### Connected');
        };

        eb.onclose = function () {
            console.log('#### Closed');
            eb = null;
        };
    }
}

//$(document).ready(function () {
//    $("#sendButton").click(function () {
//        publish($("#sendAddress").val(), $("#sendMessage").val());
//    });
//
//    $("#subscribeButton").click(function () {
//        subscribe($("#subscribeAddress").val());
//    });
//
//    $("#closeButton").click(function () {
//        closeConn();
//    });
//
//    $("#connectButton").click(function () {
//        openConn();
//    });
//});

$(function (){
   openConn();
});


