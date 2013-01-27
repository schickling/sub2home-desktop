// Filename: src/js/views/store/tray/CheckoutSettingsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/tray/CheckoutSettingsTemplate.html'
	], function ($, _, Backbone, CheckoutSettingsTemplate) {

	var CheckoutSettingsView = Backbone.View.extend({

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(CheckoutSettingsTemplate);
		}

	});

	return CheckoutSettingsView;

});