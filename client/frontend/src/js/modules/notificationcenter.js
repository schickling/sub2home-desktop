// Filename: src/js/modules/notificationcenter.js
define([
	'models/NotificationModel',
	'views/notifications/NotificationcenterView'
	], function (NotificationModel, NotificationcenterView) {

	var Notificationcenter = {

		view: null,

		init: function () {
			this.view = new NotificationcenterView();
		},

		error: function (title, description) {
			this.notify({
				title: title,
				description: description,
				type: 'error',
				duration: 20000
			});
		},

		info: function (title, description) {
			this.notify({
				title: title,
				description: description,
				type: 'info',
				duration: 2000
			});
		},

		success: function (title, description) {
			this.notify({
				title: title,
				description: description,
				type: 'success',
				duration: 2000
			});
		},

		warning: function (title, description) {
			this.notify({
				title: title,
				description: description,
				type: 'warning',
				duration: 2000
			});
		},

		notify: function (item) {

			var notificationModel = new NotificationModel(item);

			this.view.renderNotification(notificationModel);

		}

	};

	return Notificationcenter;

});