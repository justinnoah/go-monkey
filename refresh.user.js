// ==UserScript==
//
// @name        Go Refresh
// @namespace   http://online-go.com/games/mygames.php
// @description Refreshes the game list every second for online-go
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
//
// ==/UserScript==

var refreshTime = 5;

var timerDisplay = document.createElement('p');
timerDisplay.textContent = "Refresh in " + refreshTime + " second(s)";
$("td.maincontent form p").append(timerDisplay);

function clickUpdate() {
    var inputs = document.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('value') == "Update list") {
            var evnt = document.createEvent("MouseEvents");
            evnt.initEvent("click", true, true);
            inputs[i].dispatchEvent(evnt);
        }
    }
}

function refreshTimer() {
    if (refreshTime <= 0) {
        clearInterval(timer);
        clickUpdate();
    }
    timerDisplay.textContent = "Refresh in " + refreshTime + " second(s)";
    refreshTime = refreshTime - 1;
}

var timer = setInterval(refreshTimer, 1000);
