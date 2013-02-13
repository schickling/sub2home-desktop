// Filename: src/js/views/header/ClientView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/header/ClientTemplate.html'
	], function ($, _, Backbone, ClientTemplate) {

	var ClientView = Backbone.View.extend({

		initialize: function () {
			this.render();
		},

		render: function () {

			this.$el.html(ClientTemplate);

		}

	});

	return ClientView;

});