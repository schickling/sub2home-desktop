// Filename: src/js/views/store/checkout/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'text!templates/store/checkout/MainTemplate.html'
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