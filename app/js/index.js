"use strict";

var home       = 'home';
var subscribed = 'subscribed';
var about      = 'about';
var team       = 'team';

window.onpopstate = function() {
	loadPage();
};

window.onhashchange = function() {
	loadPage();
};

window.onload = function() {
	loadPage();
};

function loadPage() {
	var hash = window.location.hash.slice(1).toLowerCase() || home;
	var template = window.ellomix.templates[hash];
	var contentDiv = $('#content');

	contentDiv.html(template);
}