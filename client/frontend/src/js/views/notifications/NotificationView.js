// Filename: src/js/views/notifications/NotificationView
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/notifications/NotificationTemplate.html'
	], function ($, _, Backbone, NotificationTemplate) {

	var NotificationView = Backbone.View.extend({

		className: 'notification',

		template: _.template(NotificationTemplate),

		timer: 0,

		events: {
			'click .bClose': 'destroy'
		},

		initialize: function () {
			this.render();
			// this.countdown();
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			this.$el.addClass(this.model.get('type'));
		},

		countdown: function () {
			var self = this;

			this.timer = setTimeout(function () {
				self.remove();
			}, this.model.get('duration'));
		},

		destroy: function () {
			clearTimeout(this.timer);

			this.remove();
		}

	});

	return NotificationView;
});