define [
  "jquery"
  "underscore"
  "backbone"
], ($, _, Backbone) ->

  DeliveryTimesView = Backbone.View.extend

    initialize: ->
      @_render()
      @_markClosedDeliveryTimes()

    _render: ->
      _.each @collection.models, ((deliveryTimeModel) ->
        @_renderDeliveryTime deliveryTimeModel
      ), this

    _renderDeliveryTime: (deliveryTimeModel) ->
      $weekday = @$(".weekday[data-day=\"" + deliveryTimeModel.get("dayOfWeek") + "\"]")
      $openingHours = $weekday.find(".openingHours")
      startTime = deliveryTimeModel.getStartTime()
      endTime = deliveryTimeModel.getEndTime()
      $deliveryTime = $("<div>",
        text: startTime + " - " + endTime
      )
      $openingHours.append $deliveryTime

    _markClosedDeliveryTimes: ->
      $weekdays = @$(".weekday")
      $closed = $("<div>Geschlossen</div>")
      $openingHours = undefined
      $weekdays.each ->
        $openingHours = $(this).find(".openingHours")
        $openingHours.append $closed.clone()  if $openingHours.is(":empty")


