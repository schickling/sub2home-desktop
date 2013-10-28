define [
  "jquery"
  "underscore"
  "backbone"
  "moment"
  "models/stateModel"
  "text!templates/store/home/DeliveryTemplate.html"
], ($, _, Backbone, moment, stateModel, DeliveryTemplate) ->

  DeliveryView = Backbone.View.extend

    template: _.template(DeliveryTemplate)

    initialize: ->
      @_render()  if stateModel.get("storeModel").get("deliveryAreaWasSelected")
      @_listenToStoreModel()

    _render: ->
      storeModel = stateModel.get("storeModel")
      selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel()
      area = selectedDeliveryAreaModel.get("district") or selectedDeliveryAreaModel.get("city")
      isDelivering = storeModel.isDelivering()
      nextDeliveryTime = ""
      unless isDelivering
        nextDeliveryTimeModel = storeModel.getNextDeliveryTimeModel()
        now = new Date()
        currentDayOfWeek = now.getDay()
        nextDayOfWeek = nextDeliveryTimeModel.get("dayOfWeek")
        if currentDayOfWeek isnt nextDayOfWeek
          nextDeliveryTime += @_getWeekDay(nextDayOfWeek) + " - " + nextDeliveryTimeModel.getStartTime()
          @_fixWidthOtherDay area, nextDeliveryTime
        else
          @_fixWidthToday area, nextDeliveryTime
          nextDeliveryTime += nextDeliveryTimeModel.getStartTime()
      json =
        area: area
        postal: selectedDeliveryAreaModel.get("postal")
        minimumDuration: selectedDeliveryAreaModel.get("minimumDuration")
        isDelivering: storeModel.isDelivering()
        nextDeliveryTime: nextDeliveryTime

      @$el.html @template(json)

    _listenToStoreModel: ->
      storeModel = stateModel.get("storeModel")
      @listenTo storeModel, "change", @_render

    _getWeekDay: (dayOfWeek) ->
      weekdays =
        0: "Sonntag"
        1: "Montag"
        2: "Dienstag"
        3: "Mittwoch"
        4: "Donnerstag"
        5: "Freitag"
        6: "Samstag"

      weekdays[dayOfWeek]

    _fixWidthToday: (area, nextDeliveryTime) ->
      tooLong = area.length + nextDeliveryTime.length > 9
      @$el.toggleClass "shrink", tooLong

    _fixWidthOtherDay: (area, nextDeliveryTime) ->
      tooLong = area.length + nextDeliveryTime.length > 21
      @$el.toggleClass "shrink", tooLong

