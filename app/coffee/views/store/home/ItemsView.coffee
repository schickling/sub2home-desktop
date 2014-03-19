define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/home/ItemView"
], ($, _, Backbone, ItemView) ->

  ItemsView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      _.each @collection.models, (itemModel) =>
        @_renderItem itemModel

    _renderItem: (itemModel) ->
      itemView = new ItemView model: itemModel
      @$el.append itemView.el

