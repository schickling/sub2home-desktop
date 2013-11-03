define ["underscore", "backbone", "models/StoreModel"], (_, Backbone, StoreModel) ->

  StoresCollection = Backbone.Collection.extend

    model: StoreModel

    url: "stores"

    filterByDeliveryPostal: (postal) ->
      storesInRange = @filter((storeModel) ->
        isInRange = false
        deliveryAreasCollection = storeModel.get("deliveryAreasCollection")
        return false  unless deliveryAreasCollection
        _.each deliveryAreasCollection.models, (deliveryAreaModel) ->
          if deliveryAreaModel.get("postal") is postal
            isInRange = true
            return

        isInRange
      )
      storesInRange
