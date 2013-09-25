// Filename: src/js/views/home/404/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'services/router',
    'views/PageView',
    'text!templates/home/404/MainTemplate.html'
    ], function ($, _, Backbone, router, PageView, MainTemplate) {

	"use strict";

	var MainView = PageView.extend({

		pageTitle: 'Seite nicht gefunden - sub2home',

		events: {
			'click .bigBack': '_back'
		},

		initialize: function () {
			this._render();

			this.append();
		},

		_render: function () {
			this.$el.html(MainTemplate);
		},

		_back: function () {
			router.navigate('/', true);
		}

	});

	return MainView;

});