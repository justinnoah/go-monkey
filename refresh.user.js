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

// Element to add the timer text
var elem = $("table.maincontent tbody tr td.maincontent h1");

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
    // Clear and click once time runs out
    if (refreshTime <= 0) {
        clearInterval(timer);
        clickUpdate();
    }
    // else update the display
    var myGamesText = "My Games - refresh in " + refreshTime + " second(s)";

    elem.text(myGamesText);
    refreshTime = refreshTime - 1;
}

// Start our time interval
var timer = setInterval(refreshTimer, 1000);
