// Filename: src/js/views/store/assortment/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'text!templates/store/assortment/MainTemplate.html'
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