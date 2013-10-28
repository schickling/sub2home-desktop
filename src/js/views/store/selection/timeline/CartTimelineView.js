define(["jquery", "underscore", "backbone", "views/store/selection/timeline/TimelineView"], function($, _, Backbone, TimelineView) {
  var CartTimelineView;
  return CartTimelineView = TimelineView.extend({
    render: function() {
      var $overlay, $stage, $stageCart;
      $stage = this.$("#stageTimeline");
      $stageCart = $stage.find(".itemsTimeline").last();
      $overlay = this.$("#overlayFrameWrapperTimeline");
      this.$stageContainer = $("<div class=\"itemsTimeline\">").appendTo($stage);
      this.$overlayContainer = $("<div class=\"itemsTimeline\">").appendTo($overlay);
      this.renderItemsStage();
      return this.renderItemsOverlay();
    }
  });
});

/*
//@ sourceMappingURL=CartTimelineView.js.map
*/