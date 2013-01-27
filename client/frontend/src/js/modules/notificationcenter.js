// Filename: src/js/modules/notificationcenter.js
define([
	'views/NotificationcenterView'
	], function (NotificationcenterView) {

	var Notificationcenter = {

		init: function () {
			this.view = new NotificationcenterView();
		},

		error: function(msg) {
			this.view.popup(msg, 'error');
		},

		info: function(msg) {
			this.view.popup(msg, 'info');
		}

	};

	return Notificationcenter;

});