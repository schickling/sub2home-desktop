define(["services/notificationRepository", "services/tooltipRepository", "models/NotificationModel", "models/TooltipModel", "views/notifications/NotificationsView", "views/notifications/TooltipsView"], function(notificationRepository, tooltipRepository, NotificationModel, TooltipModel, NotificationsView, TooltipsView) {
  var Notificationcenter;
  return Notificationcenter = {
    init: function() {
      this.notificationsView = new NotificationsView();
      return this.tooltipsView = new TooltipsView();
    },
    notify: function(alias, data) {
      var notificationModel;
      data = data || {};
      notificationModel = notificationRepository.getNotificationModel(alias, data);
      return this.notificationsView.renderNotification(notificationModel);
    },
    tooltip: function(alias, top, left) {
      var tooltipModel;
      tooltipModel = tooltipRepository.getTooltipModel(alias);
      return this.tooltipsView.renderTooltip(tooltipModel, top, left);
    },
    hideTooltip: function() {
      return this.tooltipsView.hideTooltip();
    },
    destroyAllNotifications: function() {
      return this.notificationsView.destroyAllNotificationViews();
    }
  };
});
