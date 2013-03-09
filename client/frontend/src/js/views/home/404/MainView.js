// Filename: src/js/views/home/404/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'views/PageView',
    'text!templates/home/404/MainTemplate.html'
    ], function ($, _, Backbone, router, PageView, MainTemplate) {

	var MainView = PageView.extend({

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