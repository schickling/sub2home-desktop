define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/shared/timeline/ItemsStageBaseView"
  "views/store/shared/timeline/ItemsOverlayBaseView"
], ($, _, Backbone, ItemsStageBaseView, ItemsOverlayBaseView) ->

  TimelineBaseView = Backbone.View.extend

    itemsStageView: null
    itemsOverlayView: null
    $stageContainer: null
    $overlayContainer: null

    initialize: ->
      @render()  if @collection.length > 0

    render: ->
      $stage = @$("#stageTimeline")
      $overlay = @$("#overlayFrameWrapperTimeline")
      @$stageContainer = $("<div class=\"itemsTimeline\">").appendTo($stage)
      @$overlayContainer = $("<div class=\"itemsTimeline\">").appendTo($overlay)
      @renderItemsStage()
      @renderItemsOverlay()

    renderItemsStage: ->
      @itemsStageView = new ItemsStageBaseView(
        collection: @collection
        el: @$stageContainer
      )

    renderItemsOverlay: ->
      @itemsOverlayView = new ItemsOverlayBaseView(
        collection: @collection
        el: @$overlayContainer
      )

    # delegate remove
    remove: ->
      if @collection.length > 0
        @itemsStageView.remove()
        @itemsOverlayView.remove()

        # destroy all timelineitems
        _.each @collection.models, (timelineItemModel) ->
          timelineItemModel.destroy()


