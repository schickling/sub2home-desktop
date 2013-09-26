define ["underscore", "backbone", "models/DeliveryTimeModel"], (_, Backbone, DeliveryTimeModel) ->

  DeliveryTimesCollection = Backbone.Collection.extend

    model: DeliveryTimeModel

    getNextDeliveryTimeModel: (skip = 0) ->
      now = new Date()
      dayOfWeek = now.getDay()

      for i in [0..6]
        filteredDeliveryTimeModels = @_getFilteredDeliveryTimeModels(dayOfWeek, i is 0)
        if skip < filteredDeliveryTimeModels.length
          return filteredDeliveryTimeModels[skip]
        else
          skip -= filteredDeliveryTimeModels.length
        dayOfWeek = (dayOfWeek + 1) % 7

      false

    _getFilteredDeliveryTimeModels: (dayOfWeek, shouldRespectStartTime) ->
      now = new Date()
      totalMinutesOfNow = now.getMinutes() + now.getHours() * 60
      filteredDeliveryTimeModels = @filter((deliveryTimeModel) ->
        if shouldRespectStartTime # today
          deliveryTimeModel.get("dayOfWeek") is dayOfWeek and deliveryTimeModel.get("endMinutes") > totalMinutesOfNow
        else
          deliveryTimeModel.get("dayOfWeek") is dayOfWeek
      )
      _.sortBy filteredDeliveryTimeModels, (deliveryTimeModel) ->
        deliveryTimeModel.get "startMinutes"

