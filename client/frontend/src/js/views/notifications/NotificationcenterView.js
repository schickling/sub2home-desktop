// Filename: src/js/views/notifications/NotificationcenterView
define([
	'jquery',
	'underscore',
	'backbone',
	'views/notifications/NotificationView'
	], function ($, _, Backbone, NotificationView) {

	var NotificationcenterView = Backbone.View.extend({

		el: $('#notificationcenter'),

		currentZIndex: 5000,

		renderNotification: function (notificationModel) {
			var notificationView = new NotificationView({
				model: notificationModel,
				zIndex: this.currentZIndex++
			});

			this.$el.prepend(notificationView.el);
		}

	});

	return NotificationcenterView;
});