define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/shared/timeline/TimelineBaseView"
  "views/store/selection/timeline/ItemsStageView"
], ($, _, Backbone, TimelineBaseView, ItemsStageView) ->

  TimelineView = TimelineBaseView.extend

    render: ->
      insertIndex = @options.insertIndex or -1
      $stage = @$("#stageTimeline")
      $stageInsertElement = $stage.find(".itemsTimeline").eq(insertIndex)
      $overlay = @$("#overlayFrameWrapperTimeline")
      $overlayInsertElement = $overlay.find(".itemsTimeline").eq(insertIndex)
      @$stageContainer = $("<div class=\"itemsTimeline\">").insertBefore($stageInsertElement)
      @$overlayContainer = $("<div class=\"itemsTimeline\">").insertBefore($overlayInsertElement)
      @renderItemsStage()
      @renderItemsOverlay()

    renderItemsStage: ->
      @itemsStageView = new ItemsStageView(
        collection: @collection
        el: @$stageContainer
      )

