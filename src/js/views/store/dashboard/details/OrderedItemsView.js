define(["jquery", "underscore", "backbone", "views/store/dashboard/details/OrderedItemView"], function($, _, Backbone, OrderedItemView) {
  var OrderedItemsView;
  return OrderedItemsView = Backbone.View.extend({
    initialize: function() {
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
      return this.$el.append(orderedItemView.el);
    }
  });
});

/*
//@ sourceMappingURL=OrderedItemsView.js.map
*/