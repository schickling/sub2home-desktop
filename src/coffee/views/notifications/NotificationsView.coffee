define [
  "jquery"
  "underscore"
  "backbone"
  "views/notifications/NotificationView"
], ($, _, Backbone, NotificationView) ->

  NotificationsView = Backbone.View.extend

    el: $("#notifications")

    currentZIndex: 5000

    renderNotification: (notificationModel) ->
      notificationView = new NotificationView(
        model: notificationModel
        zIndex: @currentZIndex++
      )
      @$el.prepend notificationView.el

      # needs to be in dom first
      notificationView.slideIn()

    destroyAllNotificationViews: ->
      @$(".notification").trigger "close"


