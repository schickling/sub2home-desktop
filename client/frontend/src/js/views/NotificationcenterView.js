// Filename: src/js/views/NotificationcenterView
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/NotificationcenterTemplate.html'
	], function ($, _, Backbone, NotificationcenterTemplate) {

	var NotificationcenterView = Backbone.View.extend({

		className: 'popup',

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(NotificationcenterTemplate);
			this.$el.appendTo($('body'));
		},

		popup_timeout: 2000,

		popup: function (msg, className) {

			// Check for laravel validation object
			if (typeof (msg) == 'object') {
				msg = this.parseValidationErrors(msg);
			}

			this.$el.hide();

			this.$('span').text(msg);

			this.$el.removeClass('info error').addClass(className).fadeIn();


			// Fadeout popup
			var self = this;

			clearTimeout(this.popup_timeout);
			this.popup_timeout = setTimeout(function () {
				self.$el.fadeOut();
			}, 5000);
		},

		parseValidationErrors: function (errors) {
			var fields = errors.messages,
				str = '';

			_.each(fields, function (field) {
				_.each(field, function (message) {
					str += message + ' ';
				});
			});

			return str;
		}

	});

	return NotificationcenterView;
});