define(["underscore", "backbone", "models/DeliveryAreaModel"], function(_, Backbone, DeliveryAreaModel) {
  var DeliveryAreasCollection;
  return DeliveryAreasCollection = Backbone.Collection.extend({
    model: DeliveryAreaModel,
    comparator: function(deliveryAreaModel) {
      return deliveryAreaModel.get("postal");
    }
  });
});
