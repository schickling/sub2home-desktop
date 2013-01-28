// Filename: js/views/dashboard/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'text!templates/dashboard/MainTemplate.html'
	], function ($, _, Backbone, PageView, MainTemplate) {

	var MainView = PageView.extend({

		pageTitle: 'Dashboard',

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(MainTemplate);
		}

	});

	return MainView;

});