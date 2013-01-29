// Filename: js/views/PageView.js
define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {

	var PageView = Backbone.View.extend({

		el: $('body')

	});

	return PageView;

});