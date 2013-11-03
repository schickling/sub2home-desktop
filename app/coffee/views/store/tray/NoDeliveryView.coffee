define [
  "jquery"
  "underscore"
  "backbone"
  "models/stateModel"
  "text!templates/store/tray/NoDeliveryTemplate.html"
], ($, _, Backbone, stateModel, NoDeliveryTemplate) ->

  NoDeliveryView = Backbone.View.extend

    template: _.template(NoDeliveryTemplate)

    initialize: ->
      @_render()

    _render: ->
      storeModel = stateModel.get("storeModel")
      nextDeliveryTimeModel = storeModel.getNextDeliveryTimeModel()
      nextDayOfWeek = nextDeliveryTimeModel.get("dayOfWeek")
      json =
        nextDeliveryDay: @_getWeekDay(nextDayOfWeek)
        nextDeliveryTime: nextDeliveryTimeModel.getStartTime()

      @$el.html @template(json)

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


