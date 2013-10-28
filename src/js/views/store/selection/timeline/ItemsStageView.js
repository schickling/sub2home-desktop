define(["jquery", "underscore", "backbone", "views/store/shared/timeline/ItemsStageBaseView", "views/store/selection/timeline/ItemStageView"], function($, _, Backbone, ItemsStageBaseView, ItemStageView) {
  var ItemsStageView;
  return ItemsStageView = ItemsStageBaseView.extend({
    render: function() {
      var $phrase, firstTimelineItemModel;
      _.each(this.collection.models, (function(modelItem) {
        return this.renderItem(modelItem);
      }), this);
      firstTimelineItemModel = this.collection.first();
      if (!firstTimelineItemModel.get("disabled")) {
        $phrase = $("<div>", {
          "class": "phrase",
          text: firstTimelineItemModel.get("phrase")
        });
        return this.$el.append($phrase);
      }
    },
    renderItem: function(modelItem) {
      var itemContentView;
      itemContentView = new ItemStageView({
        model: modelItem
      });
      return this.$el.append(itemContentView.el);
    }
  });
});

/*
//@ sourceMappingURL=ItemsStageView.js.map
*/