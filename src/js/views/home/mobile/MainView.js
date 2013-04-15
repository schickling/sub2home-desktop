// Filename: src/js/views/home/mobile/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/PageView',
    'text!templates/home/mobile/MainTemplate.html'
    ], function ($, _, Backbone, PageView, MainTemplate) {

	var MainView = PageView.extend({

		pageTitle: 'Mobile Seite in Entwicklung - sub2home',

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