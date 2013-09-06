// ==UserScript==
//
// @name        Go Refresh
// @namespace   http://online-go.com/games/mygames.php
// @description Refreshes the game list every second for online-go
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
//
// ==/UserScript==

// Initial Timer setting, eventually this should be changeable
var refreshTime = 5;

// Simple element for adding our timing text
var timerDisplay = document.createElement('p');
timerDisplay.textContent = "Refresh in " + refreshTime + " second(s)";
$("td.maincontent form p").append(timerDisplay);

// Simulate the clicking of the "Update list" button
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

// Update the timer text and 'click' the button when the time runs out
function refreshTimer() {
    if (refreshTime <= 0) {
        clearInterval(timer);
        clickUpdate();
    }
    timerDisplay.textContent = "Refresh in " + refreshTime + " second(s)";
    refreshTime = refreshTime - 1;
}

// Start our time interval
var timer = setInterval(refreshTimer, 1000);
