define(["jquery", "underscore", "backbone", "views/store/shared/timeline/ItemsBaseView", "views/store/shared/timeline/ItemStageBaseView"], function($, _, Backbone, ItemsBaseView, ItemStageBaseView) {
  var ItemsStageBaseView;
  return ItemsStageBaseView = ItemsBaseView.extend({
    renderItem: function(modelItem) {
      var itemContentView;
      itemContentView = new ItemStageBaseView({
        model: modelItem
      });
      return this.$el.append(itemContentView.$el);
    }
  });
});

/*
//@ sourceMappingURL=ItemsStageBaseView.js.map
*/