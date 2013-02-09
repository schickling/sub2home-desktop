// Filename: src/js/views/client/config/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'text!templates/client/config/MainTemplate.html'
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