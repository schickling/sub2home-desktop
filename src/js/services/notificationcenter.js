define(["jquery", "tooltipster", "services/notificationRepository", "services/tooltipRepository", "models/NotificationModel", "models/TooltipModel", "views/notifications/NotificationsView"], function($, tooltipster, notificationRepository, tooltipRepository, NotificationModel, TooltipModel, NotificationsView) {
  var Notificationcenter;
  return Notificationcenter = {
    lastNotificationAlias: null,
    init: function() {
      return this.notificationsView = new NotificationsView();
    },
    notify: function(alias, data) {
      var notificationModel;
      if (this.lastNotificationAlias === alias) {
        this.destroyAllNotifications();
      }
      data = data || {};
      this.lastNotificationAlias = alias;
      notificationModel = notificationRepository.getNotificationModel(alias, data);
      return this.notificationsView.renderNotification(notificationModel);
    },
    tooltip: function($el) {
      var tooltipModel;
      tooltipModel = tooltipRepository.getTooltipModel($el.attr('data-tooltip-message'));
      return $el.tooltipster({
        functionBefore: function(origin, continueTooltip) {
          origin.tooltipster('update', tooltipModel.get('text'));
          return continueTooltip();
        }
      });
    },
    destroyAllNotifications: function() {
      return this.notificationsView.destroyAllNotificationViews();
    }
  };
});

/*
//@ sourceMappingURL=notificationcenter.js.map
*/