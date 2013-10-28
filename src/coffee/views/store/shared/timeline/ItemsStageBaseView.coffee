define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/shared/timeline/ItemsBaseView"
  "views/store/shared/timeline/ItemStageBaseView"
], ($, _, Backbone, ItemsBaseView, ItemStageBaseView) ->

  ItemsStageBaseView = ItemsBaseView.extend

    renderItem: (modelItem) ->
      itemContentView = new ItemStageBaseView(model: modelItem)
      @$el.append itemContentView.$el


