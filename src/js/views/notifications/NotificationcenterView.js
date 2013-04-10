// Filename: src/js/views/notifications/NotificationcenterView
define([
    'jquery',
    'underscore',
    'backbone',
    'views/notifications/NotificationView',
    'views/notifications/TooltipView'
    ], function ($, _, Backbone, NotificationView, TooltipView) {

	var NotificationcenterView = Backbone.View.extend({

		el: $('#notificationcenter'),

		currentZIndex: 5000,

		currentTooltipView: null,

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
		},

		renderTooltip: function (tooltipModel, top, left) {
			// hide old tooltip
			this.hideTooltip();

			var tooltipView = new TooltipView({
				model: tooltipModel,
				top: top,
				left: left
			});

			this.$el.prepend(tooltipView.el);

			// needs to be in dom first
			tooltipView.show();

			this.currentTooltipView = tooltipView;
		},

		hideTooltip: function () {
			if (this.currentTooltipView) {
				this.currentTooltipView.hide();
			}
		}

	});

	return NotificationcenterView;
});