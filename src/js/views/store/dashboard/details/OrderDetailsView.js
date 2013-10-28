define(["jquery", "underscore", "backbone", "views/store/dashboard/details/AddressView", "views/store/dashboard/details/OrderedItemsView", "views/store/dashboard/details/InfoView", "text!templates/store/dashboard/details/OrderDetailsTemplate.html"], function($, _, Backbone, AddressView, OrderedItemsView, InfoView, OrderDetailsTemplate) {
  var OrderDetailsView;
  return OrderDetailsView = Backbone.View.extend({
    initialize: function() {
      return this._render();
    },
    _render: function() {
      this.$el.html(OrderDetailsTemplate);
      this._renderAddress();
      this._renderOrderedItems();
      return this._renderInfo();
    },
    _renderAddress: function() {
      return new AddressView({
        el: this.$(".address"),
        model: this.model.get("addressModel")
      });
    },
    _renderOrderedItems: function() {
      return new OrderedItemsView({
        el: this.$(".orderedItems"),
        collection: this.model.get("orderedItemsCollection")
      });
    },
    _renderInfo: function() {
      return new InfoView({
        el: this.$(".info"),
        model: this.model
      });
    }
  });
});

/*
//@ sourceMappingURL=OrderDetailsView.js.map
*/