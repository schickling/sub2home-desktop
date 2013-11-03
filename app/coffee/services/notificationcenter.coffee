define [
  "jquery"
  "tooltipster"
  "services/notificationRepository"
  "services/tooltipRepository"
  "models/NotificationModel"
  "models/TooltipModel"
  "views/notifications/NotificationsView"
], ($, tooltipster, notificationRepository, tooltipRepository, NotificationModel, TooltipModel, NotificationsView) ->

  Notificationcenter =

    lastNotificationAlias: null

    init: ->
      @notificationsView = new NotificationsView()

    notify: (alias, data) ->
      @destroyAllNotifications()  if @lastNotificationAlias == alias
      data = data or {}
      @lastNotificationAlias = alias
      notificationModel = notificationRepository.getNotificationModel(alias, data)
      @notificationsView.renderNotification notificationModel

    tooltip: ($el) ->
      tooltipModel = tooltipRepository.getTooltipModel($el.attr('data-tooltip-message'))
      $el.tooltipster
        arrow: false
        delay: 0
        theme: tooltipModel.get("className")
        offsetX: $el.attr('data-tooltip-left') || 0
        offsetY: - $el.attr('data-tooltip-top') || 0
        functionBefore: (origin, continueTooltip) ->
          origin.tooltipster "update", "<div class='tooltipOuter'><div class='tooltipInner'>#{tooltipModel.get("text")}</div></div>"
          continueTooltip()

    destroyAllNotifications: ->
      @notificationsView.destroyAllNotificationViews()
