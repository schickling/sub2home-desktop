// Filename: src/js/views/home/info/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'text!templates/home/info/MainTemplate.html'
	], function ($, _, Backbone, PageView, MainTemplate) {

	var MainView = PageView.extend({

		pageTitle: 'Infotheke - sub2home',

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