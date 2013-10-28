define(["jquery", "underscore", "backbone", "models/cartModel", "views/store/tray/OrderedItemView"], function($, _, Backbone, cartModel, OrderedItemView) {
  var OrderedItemsView;
  return OrderedItemsView = Backbone.View.extend({
    initialize: function() {
      this.collection = cartModel.getOrderedItemsCollection();
      return this._render();
    },
    _render: function() {
      return _.each(this.collection.models, (function(orderedItemModel) {
        return this._renderOrderedItem(orderedItemModel);
      }), this);
    },
    _renderOrderedItem: function(orderedItemModel) {
      var orderedItemView;
      orderedItemView = new OrderedItemView({
        model: orderedItemModel
      });
      return this.$el.append(orderedItemView.$el);
    }
  });
});

/*
//@ sourceMappingURL=OrderedItemsView.js.map
*/