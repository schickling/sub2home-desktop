// Filename: src/js/views/store/info/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'text!templates/store/info/MainTemplate.html'
	], function ($, _, Backbone, PageView, MainTemplate) {

	var MainView = PageView.extend({

		pageTitle: 'Store Info',

		initialize: function () {
			this._render();
		},

		_render: function () {
			this.$el.html(MainTemplate);

			this.append();
		}

	});

	return MainView;

});