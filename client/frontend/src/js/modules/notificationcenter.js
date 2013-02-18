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

		error: function (title, description, duration) {
			this._notify({
				title: title,
				description: description,
				type: 'error',
				duration: duration | 7000
			});
		},

		info: function (title, description, duration) {
			this._notify({
				title: title,
				description: description,
				type: 'info',
				duration: duration | 4000
			});
		},

		success: function (title, description, duration) {
			this._notify({
				title: title,
				description: description,
				type: 'success',
				duration: duration | 4000
			});
		},

		warning: function (title, description, duration) {
			this._notify({
				title: title,
				description: description,
				type: 'warning',
				duration: duration | 5000
			});
		},

		_notify: function (item) {

			var notificationModel = new NotificationModel(item);

			this.view.renderNotification(notificationModel);

		},

		clean: function() {
			this.view.destroyAllNotificationViews();
		}

	};

	return Notificationcenter;

});