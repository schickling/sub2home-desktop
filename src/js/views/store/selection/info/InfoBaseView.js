// Filename: src/js/views/store/selection/info/InfoBaseView.js
define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {

	"use strict";

	var InfoBaseView = Backbone.View.extend({

		className: 'info',

		initialize: function () {
			this.render();
		},

		render: function () {

			// wrap this.$el
			var $el = $('<div>').addClass(this.className).appendTo(this.$el);
			this.$el = $el;


			this.$el.html(this.template());

			this.renderContent();

			return this;
		},

		template: function () {},

		renderContent: function () {}

	});

	return InfoBaseView;

});