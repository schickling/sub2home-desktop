define(["jquery", "underscore", "backbone", "views/store/shared/timeline/ItemsBaseView", "views/store/shared/timeline/ItemOverlayBaseView"], function($, _, Backbone, ItemsBaseView, ItemOverlayBaseView) {
  var ItemsOverlayBaseView;
  return ItemsOverlayBaseView = ItemsBaseView.extend({
    renderItem: function(modelItem) {
      var itemOverlayView;
      itemOverlayView = new ItemOverlayBaseView({
        model: modelItem
      });
      return this.$el.append(itemOverlayView.$el);
    }
  });
});

/*
//@ sourceMappingURL=ItemsOverlayBaseView.js.map
*/