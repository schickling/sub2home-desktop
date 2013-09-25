define ["notificationRepository", "tooltipRepository", "models/NotificationModel", "models/TooltipModel", "views/notifications/NotificationsView", "views/notifications/TooltipsView"], (notificationRepository, tooltipRepository, NotificationModel, TooltipModel, NotificationsView, TooltipsView) ->

  Notificationcenter =
    init: ->
      @notificationsView = new NotificationsView()
      @tooltipsView = new TooltipsView()

    notify: (alias, data) ->
      data = data or {}
      notificationModel = notificationRepository.getNotificationModel(alias, data)
      @notificationsView.renderNotification notificationModel

    tooltip: (alias, top, left) ->
      tooltipModel = tooltipRepository.getTooltipModel(alias)
      @tooltipsView.renderTooltip tooltipModel, top, left

    hideTooltip: ->
      @tooltipsView.hideTooltip()

    destroyAllNotifications: ->
      @notificationsView.destroyAllNotificationViews()
