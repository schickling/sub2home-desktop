define(["jquery", "underscore", "backbone", "views/store/shared/timeline/TimelineBaseView", "views/store/selection/timeline/ItemsStageView"], function($, _, Backbone, TimelineBaseView, ItemsStageView) {
  var TimelineView;
  return TimelineView = TimelineBaseView.extend({
    render: function() {
      var $overlay, $overlayInsertElement, $stage, $stageInsertElement, insertIndex;
      insertIndex = this.options.insertIndex || -1;
      $stage = this.$("#stageTimeline");
      $stageInsertElement = $stage.find(".itemsTimeline").eq(insertIndex);
      $overlay = this.$("#overlayFrameWrapperTimeline");
      $overlayInsertElement = $overlay.find(".itemsTimeline").eq(insertIndex);
      this.$stageContainer = $("<div class=\"itemsTimeline\">").insertBefore($stageInsertElement);
      this.$overlayContainer = $("<div class=\"itemsTimeline\">").insertBefore($overlayInsertElement);
      this.renderItemsStage();
      return this.renderItemsOverlay();
    },
    renderItemsStage: function() {
      return this.itemsStageView = new ItemsStageView({
        collection: this.collection,
        el: this.$stageContainer
      });
    }
  });
});

/*
//@ sourceMappingURL=TimelineView.js.map
*/