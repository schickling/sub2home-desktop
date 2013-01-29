// Filename: src/js/views/notifications/NotificationcenterView
define([
	'jquery',
	'underscore',
	'backbone',
	'views/notifications/NotificationView'
	], function ($, _, Backbone, NotificationView) {

	var NotificationcenterView = Backbone.View.extend({

		el: $('#notificationcenter'),

		notificationViews: [],

		renderNotification: function (notificationModel) {
			var notificationView = new NotificationView({
				model: notificationModel
			});

			this.$el.append(notificationView.el);
		}

	});

	return NotificationcenterView;
});