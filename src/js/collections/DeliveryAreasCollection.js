(function() {
  define(["underscore", "backbone", "models/DeliveryAreaModel"], function(_, Backbone, DeliveryAreaModel) {
    var DeliveryAreasCollection;
    DeliveryAreasCollection = Backbone.Collection.extend({
      model: DeliveryAreaModel,
      comparator: function(deliveryAreaModel) {
        return deliveryAreaModel.get("postal");
      }
    });
    return DeliveryAreasCollection;
  });

}).call(this);
