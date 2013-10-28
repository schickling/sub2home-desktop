define(["jquery", "underscore", "backbone", "views/notifications/NotificationView"], function($, _, Backbone, NotificationView) {
  var NotificationsView;
  return NotificationsView = Backbone.View.extend({
    el: $("#notifications"),
    currentZIndex: 5000,
    renderNotification: function(notificationModel) {
      var notificationView;
      notificationView = new NotificationView({
        model: notificationModel,
        zIndex: this.currentZIndex++
      });
      this.$el.prepend(notificationView.el);
      return notificationView.slideIn();
    },
    destroyAllNotificationViews: function() {
      return this.$(".notification").trigger("close");
    }
  });
});

/*
//@ sourceMappingURL=NotificationsView.js.map
*/