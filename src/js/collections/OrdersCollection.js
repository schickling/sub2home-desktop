define(["underscore", "backbone", "models/OrderModel"], function(_, Backbone, OrderModel) {
  var OrdersCollection;
  return OrdersCollection = Backbone.Collection.extend({
    model: OrderModel,
    url: "stores/storeAlias/orders",
    comparator: function(orderModel) {
      return -orderModel.id;
    }
  });
});

/*
//@ sourceMappingURL=OrdersCollection.js.map
*/