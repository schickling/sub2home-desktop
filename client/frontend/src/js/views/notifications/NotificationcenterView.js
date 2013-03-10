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

		initialize: function () {
			this._listenToMouseWheel();
		},

		_listenToMouseWheel: function () {

			var self = this;

			$(document).on('mousewheel', function () {
				if (self.currentTooltipView) {
					self.currentTooltipView.hide();
				}
			});

		},

		renderNotification: function (notificationModel) {
			var notificationView = new NotificationView({
				model: notificationModel,
				zIndex: this.currentZIndex++
			});

			this.$el.prepend(notificationView.el);

			// needs to be in dom first
			notificationView.slideIn();
		},

		renderTooltip: function (tooltipModel, top, left) {
			// hide old tooltip
			if (this.currentTooltipView) {
				this.currentTooltipView.hide();
			}

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

		destroyAllNotificationViews: function () {
			this.$('.notification').trigger('close');
		}

	});

	return NotificationcenterView;
});