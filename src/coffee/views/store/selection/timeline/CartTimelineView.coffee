define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/timeline/TimelineView"
], ($, _, Backbone, TimelineView) ->

  CartTimelineView = TimelineView.extend
    render: ->
      $stage = @$("#stageTimeline")
      $stageCart = $stage.find(".itemsTimeline").last()
      $overlay = @$("#overlayFrameWrapperTimeline")
      @$stageContainer = $("<div class=\"itemsTimeline\">").appendTo($stage)
      @$overlayContainer = $("<div class=\"itemsTimeline\">").appendTo($overlay)
      @renderItemsStage()
      @renderItemsOverlay()

