(function() {
  define(["underscore", "backbone", "models/StoreModel"], function(_, Backbone, StoreModel) {
    "use strict";
    var StoresCollection;
    StoresCollection = Backbone.Collection.extend({
      model: StoreModel,
      url: "stores",
      filterByDeliveryPostal: function(postal) {
        var storesInRange;
        storesInRange = this.filter(function(storeModel) {
          var deliveryAreasCollection, isInRange;
          isInRange = false;
          deliveryAreasCollection = storeModel.get("deliveryAreasCollection");
          if (!deliveryAreasCollection) {
            return false;
          }
          _.each(deliveryAreasCollection.models, function(deliveryAreaModel) {
            if (deliveryAreaModel.get("postal") === postal) {
              isInRange = true;
            }
          });
          return isInRange;
        });
        return storesInRange;
      }
    });
    return StoresCollection;
  });

}).call(this);
