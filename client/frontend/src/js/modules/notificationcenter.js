// Filename: src/js/modules/notificationcenter.js
define([
    'notificationRepository',
    'tooltipRepository',
    'models/NotificationModel',
    'models/TooltipModel',
    'views/notifications/NotificationcenterView'
    ], function (notificationRepository, tooltipRepository, NotificationModel, TooltipModel, NotificationcenterView) {

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

		tooltip: function (alias, top, left) {

			var tooltipModel = tooltipRepository.getTooltipModel(alias);

			this.view.renderTooltip(tooltipModel, top, left);

		},

		hideTooltip: function () {
			this.view.hideTooltip();
		},

		clean: function () {
			this.view.destroyAllNotificationViews();
		}

	};

	return Notificationcenter;

});