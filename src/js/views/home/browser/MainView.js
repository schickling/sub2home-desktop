// Filename: src/js/views/home/browser/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/PageView',
    'text!templates/home/browser/MainTemplate.html'
    ], function ($, _, Backbone, PageView, MainTemplate) {

	var MainView = PageView.extend({

		pageTitle: 'Browser nicht unterstützt - sub2home',

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