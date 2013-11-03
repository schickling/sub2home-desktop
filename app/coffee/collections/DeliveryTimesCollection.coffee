define ["underscore", "backbone", "models/DeliveryTimeModel"], (_, Backbone, DeliveryTimeModel) ->

  DeliveryTimesCollection = Backbone.Collection.extend

    model: DeliveryTimeModel

    getNextDeliveryTimeModel: (date) ->
      dayOfWeek = date.getDay()
      totalMinutes = date.getMinutes() + date.getHours() * 60

      for i in [0..6]
        filteredDeliveryTimeModels = @_getFilteredDeliveryTimeModels(totalMinutes, dayOfWeek, i is 0)
        return filteredDeliveryTimeModels[0]  if filteredDeliveryTimeModels.length > 0
        dayOfWeek = (dayOfWeek + 1) % 7

      false

    _getFilteredDeliveryTimeModels: (totalMinutes, dayOfWeek, shouldRespectStartTime) ->
      # filter
      filteredDeliveryTimeModels = @filter (deliveryTimeModel) ->
        deliveryTimeModel.get("dayOfWeek") is dayOfWeek and (shouldRespectStartTime and deliveryTimeModel.get("endMinutes") >= totalMinutes or not shouldRespectStartTime)
      # sort
      _.sortBy filteredDeliveryTimeModels, (deliveryTimeModel) ->
        deliveryTimeModel.get "startMinutes"
