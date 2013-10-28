define ["jquery", "tooltipster", "services/notificationRepository", "services/tooltipRepository", "models/NotificationModel", "models/TooltipModel", "views/notifications/NotificationsView"], ($, tooltipster, notificationRepository, tooltipRepository, NotificationModel, TooltipModel, NotificationsView) ->

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
      $el.tooltipster {
        # theme: ".#{$el.attr('data-tooltip-class')}"
        functionBefore: (origin, continueTooltip) ->
          origin.tooltipster('update', tooltipModel.get('text'))
          continueTooltip()
        }

    destroyAllNotifications: ->
      @notificationsView.destroyAllNotificationViews()
