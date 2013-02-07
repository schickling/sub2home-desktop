// Filename: src/js/views/client/login/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'text!templates/client/login/MainTemplate.html'
	], function ($, _, Backbone, PageView, MainTemplate) {

	var MainView = PageView.extend({

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(MainTemplate);

			this.append();
		}


	});

	return MainView;

});