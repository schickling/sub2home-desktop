// Filename: src/js/views/error/404/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'text!templates/error/404/MainTemplate.html'
	], function ($, _, Backbone, PageView, MainTemplate) {

	var MainView = PageView.extend({

		initialize: function () {
			this._render();

			this.append();
		},

		_render: function () {
			this.$el.html(MainTemplate);
		}

	});

	return MainView;

});