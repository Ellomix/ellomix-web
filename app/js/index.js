"use strict";

var home = 'home';

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
	// Grab hash and load appropriate template
	var hash = window.location.hash.slice(1).toLowerCase() || home;
	var template = window.ellomix.templates[hash];

	// Close side nav and set screen to the top
	$('.side-nav').width(0);
	window.scrollTo(0, 0);

	// Remove hidden class on elements
	$('#content').removeClass('hidden')
	$('.ellipse').removeClass('hidden')
	$('.logo-text').removeClass('hidden')
	$('.footer').removeClass('hidden')

	// Set template HTML on content div
	var contentDiv = $('#content');
	contentDiv.html(template);
}

function openNav() {
	$('.side-nav').animate({width: '100%'}, 500);

	$('#content').removeClass('shown').addClass('hidden');
	$('.ellipse').removeClass('shown').addClass('hidden');
	$('.logo-text').removeClass('shown').addClass('hidden');
	$('.footer').removeClass('shown').addClass('hidden');
}

function closeNav() {
	$('.side-nav').animate({width: 0}, 500);

	$('#content').removeClass('hidden').addClass('shown');
	$('.ellipse').removeClass('hidden').addClass('shown');
	$('.logo-text').removeClass('hidden').addClass('shown');
	$('.footer').removeClass('hidden').addClass('shown');
}