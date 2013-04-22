// Filename: src/js/views/shared/info/HomeView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/shared/info/HomeTemplate.html'
    ], function ($, _, Backbone, HomeTemplate) {

	var HomeView = Backbone.View.extend({

		initialize: function () {
			this._render();
		},

		_render: function () {

			this.$el.html(HomeTemplate);

		}

	});

	return HomeView;

});