define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/shared/timeline/ItemsStageBaseView"
  "views/store/selection/timeline/ItemStageView"
], ($, _, Backbone, ItemsStageBaseView, ItemStageView) ->

  ItemsStageView = ItemsStageBaseView.extend

    render: ->
      # render items
      _.each @collection.models, ((modelItem) ->
        @renderItem modelItem
      ), this

      # render description
      firstTimelineItemModel = @collection.first()
      unless firstTimelineItemModel.get("disabled")
        $phrase = $("<div>",
          class: "phrase"
          text: firstTimelineItemModel.get("phrase")
        )
        @$el.append $phrase

    renderItem: (modelItem) ->
      itemContentView = new ItemStageView(model: modelItem)
      @$el.append itemContentView.el

