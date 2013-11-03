define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "models/DeliveryTimeModel"
  "collections/DeliveryTimesCollection"
  "views/store/config/DeliveryTimeView"
], ($, _, Backbone, notificationcenter, DeliveryTimeModel, DeliveryTimesCollection, DeliveryTimeView) ->

  DeliveryTimesView = Backbone.View.extend

    events:
      "click .bAdd": "_addDeliveryTime"

    initialize: ->
      @_render()

    _render: ->
      _.each @collection.models, ((deliveryTimeModel) ->
        @_renderDeliveryTime deliveryTimeModel
      ), this

    _renderDeliveryTime: (deliveryTimeModel) ->
      deliveryTimeView = new DeliveryTimeView(model: deliveryTimeModel)
      $matchingBusinessDay = @$(".businessDay[data-day=\"" + deliveryTimeModel.get("dayOfWeek") + "\"]")
      $openingHours = $matchingBusinessDay.find(".openingHours")
      $openingHours.append deliveryTimeView.el

    _addDeliveryTime: (e) ->
      dayOfWeek = $(e.target).parents(".businessDay").first().attr("data-day")
      self = this
      @collection.create
        dayOfWeek: dayOfWeek
      ,
        validate: false
        success: (deliveryTimeModel) ->
          notificationcenter.notify "views.store.config.deliveryTime.add.success"
          self._renderDeliveryTime deliveryTimeModel

        error: ->
          notificationcenter.notify "views.store.config.deliveryTime.add.error"

