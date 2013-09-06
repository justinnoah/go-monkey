// ==UserScript==
//
// @name        Go Refresh
// @namespace   http://online-go.com/games/mygames.php
// @description Refreshes the game list every second for online-go
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
//
// ==/UserScript==

// Easy add CSS function
// Credit: http://greasemonkey.win-start.de/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var timerCSS = "#timerText {\
    background: #6688AA;\
    border-width: 5px;\
    border-color: #7799BB;\
    color: white;\
    top: 0;\
    left: 40%;\
    position: fixed;\
}";

addGlobalStyle(timerCSS);

// Initial Timer setting, eventually this should be changeable
var refreshTime = 5;

// Simple element for adding our timing text
var timerText = document.createElement('div');
timerText.textContent = "Refresh in " + refreshTime + " second(s)";
timerText.id = "timerText";
$("html").append(timerText);

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
    timerText.textContent = "Refresh in " + refreshTime + " second(s)";
    refreshTime = refreshTime - 1;
}

// Start our time interval
var timer = setInterval(refreshTimer, 1000);
