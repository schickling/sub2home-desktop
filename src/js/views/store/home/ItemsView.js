define(["jquery", "underscore", "backbone", "views/store/home/ItemView"], function($, _, Backbone, ItemView) {
  var ItemsView;
  return ItemsView = Backbone.View.extend({
    initialize: function() {
      this.collection.groupItems();
      return this.render();
    },
    render: function() {
      return _.each(this.collection.models, (function(itemModel) {
        if (!itemModel.get("isAttached")) {
          return this.renderItem(itemModel);
        }
      }), this);
    },
    renderItem: function(itemModel) {
      var itemView;
      itemView = new ItemView({
        model: itemModel
      });
      return this.$el.append(itemView.el);
    }
  });
});

/*
//@ sourceMappingURL=ItemsView.js.map
*/