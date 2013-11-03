define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/shared/timeline/ItemsBaseView"
  "views/store/shared/timeline/ItemOverlayBaseView"
], ($, _, Backbone, ItemsBaseView, ItemOverlayBaseView) ->

  ItemsOverlayBaseView = ItemsBaseView.extend

    renderItem: (modelItem) ->
      itemOverlayView = new ItemOverlayBaseView(model: modelItem)
      @$el.append itemOverlayView.$el

