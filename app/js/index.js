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

function loadPage(hideNav) {
	var hash = window.location.hash.slice(1).toLowerCase() || home;
	var template = window.ellomix.templates[hash];
	var contentDiv = $('#content');

	$('.side-nav').width(0);
	showContent();
	contentDiv.html(template);
}

function openNav() {
	$('.side-nav').animate({width: '100%'}, 500);
	hideContent();
}

function closeNav() {
	$('.side-nav').animate({width: 0}, 500);
	showContent();
}

function showContent() {
	$('#content').show();
	$('.ellipse').show();
	$('.logo-text').show();
	$('.footer').show();
}

function hideContent() {
	$('#content').hide();
	$('.ellipse').hide();
	$('.logo-text').hide();
	$('.footer').hide();
}