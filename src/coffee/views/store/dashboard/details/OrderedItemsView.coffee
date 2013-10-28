define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/dashboard/details/OrderedItemView"
], ($, _, Backbone, OrderedItemView) ->

  OrderedItemsView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      _.each @collection.models, ((orderedItemModel) ->
        @_renderOrderedItem orderedItemModel
      ), this

    _renderOrderedItem: (orderedItemModel) ->
      orderedItemView = new OrderedItemView(model: orderedItemModel)
      @$el.append orderedItemView.el


