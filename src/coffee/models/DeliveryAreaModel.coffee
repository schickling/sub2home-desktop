define [
  "underscore"
  "backbone"
  "services/notificationcenter"
], (_, Backbone, notificationcenter) ->

  DeliveryAreaModel = Backbone.Model.extend
    defaults:
      minimumValue: 0
      minimumDuration: 0
      district: ""
      city: ""
      postal: 0
      isSelected: false

    urlRoot: ->
      if @isNew()
        "stores/storeAlias/deliveryareas"
      else
        "deliveryareas"

    initialize: ->
      # throw errors
      @on "invalid", (model, error) ->
        notificationcenter.notify "models.deliveryAreaModel.invalid",
          error: error

    validate: (attributes) ->
      minimumValue = attributes.minimumValue
      return "minimumValue has to be numeric"  if typeof (minimumValue) isnt "number" or minimumValue isnt parseFloat(minimumValue)
      return "minimumValue can't be negative"  if minimumValue < 0
      minimumDuration = attributes.minimumDuration
      return "minimumDuration has to be numeric"  if typeof (minimumDuration) isnt "number" or minimumDuration isnt parseFloat(minimumDuration)
      return "minimumDuration can't be negative"  if minimumDuration < 0
      postal = attributes.postal
      return "postal has to be numeric"  if typeof (postal) isnt "number" or postal isnt parseInt(postal, 10)
      "no valid postal"  if postal < 10000 or postal > 99999


