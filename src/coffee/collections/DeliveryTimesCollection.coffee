define ["underscore", "backbone", "models/DeliveryTimeModel"], (_, Backbone, DeliveryTimeModel) ->

  DeliveryTimesCollection = Backbone.Collection.extend

    model: DeliveryTimeModel

    getNextDeliveryTimeModel: ->
      now = new Date()
      dayOfWeek = now.getDay()
      filteredDeliveryTimeModels = undefined

      for i in [0..6]
        filteredDeliveryTimeModels = @_getFilteredDeliveryTimeModels(dayOfWeek, i is 0)
        return filteredDeliveryTimeModels[0] if filteredDeliveryTimeModels.length > 0
        dayOfWeek = (dayOfWeek + 1) % 7

    _getFilteredDeliveryTimeModels: (dayOfWeek, shouldRespectStartTime) ->
      now = new Date()
      totalMinutesOfNow = now.getMinutes() + now.getHours() * 60
      filteredDeliveryTimeModels = @filter((deliveryTimeModel) ->
        if shouldRespectStartTime # today
          deliveryTimeModel.get("dayOfWeek") is dayOfWeek and deliveryTimeModel.get("startMinutes") > totalMinutesOfNow
        else
          deliveryTimeModel.get("dayOfWeek") is dayOfWeek
      )
      _.sortBy filteredDeliveryTimeModels, (deliveryTimeModel) ->
        deliveryTimeModel.get "startMinutes"

