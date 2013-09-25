(function() {
  define(["underscore", "backbone", "models/OrderedItemModel"], function(_, Backbone, OrderedItemModel) {
    var OrderedItemsCollection;
    OrderedItemsCollection = Backbone.Collection.extend({
      model: OrderedItemModel,
      getTotal: function() {
        var total;
        total = 0;
        this.each(function(orderedItemModel) {
          return total += orderedItemModel.get("total");
        });
        return total;
      }
    });
    return OrderedItemsCollection;
  });

}).call(this);
