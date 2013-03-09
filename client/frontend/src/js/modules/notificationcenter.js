// Filename: src/js/modules/notificationcenter.js
define([
	'notificationRepository',
	'models/NotificationModel',
	'views/notifications/NotificationcenterView'
	], function (notificationRepository, NotificationModel, NotificationcenterView) {

	var Notificationcenter = {

		view: null,

		init: function () {
			this.view = new NotificationcenterView();
		},

		notify: function (alias, data) {

			data = data || {};

			var notificationModel = notificationRepository.getNotificationModel(alias, data);

			this.view.renderNotification(notificationModel);

		},

		clean: function () {
			this.view.destroyAllNotificationViews();
		}

	};

	return Notificationcenter;

});