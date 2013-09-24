define ["underscore", "backbone", "models/DeliveryAreaModel"], (_, Backbone, DeliveryAreaModel) ->
  "use strict"
  DeliveryAreasCollection = Backbone.Collection.extend(
    model: DeliveryAreaModel
    comparator: (deliveryAreaModel) ->
      deliveryAreaModel.get "postal"
  )
  DeliveryAreasCollection
