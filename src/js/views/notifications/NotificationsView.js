// Filename: src/js/views/notifications/NotificationsView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/notifications/NotificationView'
    ], function ($, _, Backbone, NotificationView) {

	"use strict";

	var NotificationsView = Backbone.View.extend({

		el: $('#notifications'),

		currentZIndex: 5000,

		renderNotification: function (notificationModel) {
			var notificationView = new NotificationView({
				model: notificationModel,
				zIndex: this.currentZIndex++
			});

			this.$el.prepend(notificationView.el);

			// needs to be in dom first
			notificationView.slideIn();
		},

		destroyAllNotificationViews: function () {
			this.$('.notification').trigger('close');
		}

	});

	return NotificationsView;
});