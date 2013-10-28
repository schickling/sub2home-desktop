define(["jquery", "underscore", "backbone", "views/store/shared/timeline/ItemsStageBaseView", "views/store/shared/timeline/ItemsOverlayBaseView"], function($, _, Backbone, ItemsStageBaseView, ItemsOverlayBaseView) {
  var TimelineBaseView;
  return TimelineBaseView = Backbone.View.extend({
    itemsStageView: null,
    itemsOverlayView: null,
    $stageContainer: null,
    $overlayContainer: null,
    initialize: function() {
      if (this.collection.length > 0) {
        return this.render();
      }
    },
    render: function() {
      var $overlay, $stage;
      $stage = this.$("#stageTimeline");
      $overlay = this.$("#overlayFrameWrapperTimeline");
      this.$stageContainer = $("<div class=\"itemsTimeline\">").appendTo($stage);
      this.$overlayContainer = $("<div class=\"itemsTimeline\">").appendTo($overlay);
      this.renderItemsStage();
      return this.renderItemsOverlay();
    },
    renderItemsStage: function() {
      return this.itemsStageView = new ItemsStageBaseView({
        collection: this.collection,
        el: this.$stageContainer
      });
    },
    renderItemsOverlay: function() {
      return this.itemsOverlayView = new ItemsOverlayBaseView({
        collection: this.collection,
        el: this.$overlayContainer
      });
    },
    remove: function() {
      if (this.collection.length > 0) {
        this.itemsStageView.remove();
        this.itemsOverlayView.remove();
        return _.each(this.collection.models, function(timelineItemModel) {
          return timelineItemModel.destroy();
        });
      }
    }
  });
});

/*
//@ sourceMappingURL=TimelineBaseView.js.map
*/