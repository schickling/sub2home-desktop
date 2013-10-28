define [
  "underscore"
  "backbone"
  "services/notificationcenter"
], (_, Backbone, notificationcenter) ->

  DeliveryTimeModel = Backbone.Model.extend
    defaults:
      dayOfWeek: 0 # A Number, from 0 to 6, Sunday is 0, Monday is 1, and so on.
      startMinutes: 0
      endMinutes: 60

    urlRoot: ->
      if @isNew()
        "stores/storeAlias/deliverytimes"
      else
        "deliverytimes"

    initialize: ->
      # throw errors
      @on "invalid", (model, error) ->
        notificationcenter.notify "models.deliveryTimeModel.invalid",
          error: error

    checkIfNow: ->
      date = new Date()
      dayOfWeek = date.getDay()
      currentMinutes = date.getMinutes() + date.getHours() * 60
      if dayOfWeek isnt @get("dayOfWeek") or currentMinutes < @get("startMinutes") or currentMinutes > @get("endMinutes")
        false
      else
        true

    validate: (attributes) ->
      startMinutes = attributes.startMinutes
      return "startMinutes has to be numeric"  if typeof (startMinutes) isnt "number" or startMinutes isnt parseInt(startMinutes, 10)
      return "startMinutes can't be negative"  if startMinutes < 0
      endMinutes = attributes.endMinutes
      return "endMinutes has to be numeric"  if typeof (endMinutes) isnt "number" or endMinutes isnt parseInt(endMinutes, 10)
      return "endMinutes can't be negative"  if endMinutes < 0
      "endMinutes must be less then startMinutes"  if endMinutes <= startMinutes

    _renderTime: (totalMinutes) ->
      hours = parseInt(totalMinutes / 60, 10)
      minutes = totalMinutes % 60
      minutes = "0" + minutes  if minutes < 10
      hours + ":" + minutes

    getStartTime: ->
      @_renderTime @get("startMinutes")

    getEndTime: ->
      @_renderTime @get("endMinutes")

