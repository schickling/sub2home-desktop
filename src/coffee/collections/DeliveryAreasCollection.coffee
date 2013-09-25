define ["underscore", "backbone", "models/DeliveryAreaModel"], (_, Backbone, DeliveryAreaModel) ->

  DeliveryAreasCollection = Backbone.Collection.extend

    model: DeliveryAreaModel

    comparator: (deliveryAreaModel) ->
      deliveryAreaModel.get "postal"

