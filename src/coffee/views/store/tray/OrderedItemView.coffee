define [
  "jquery"
  "underscore"
  "backbone"
  "models/cartModel"
  "views/store/tray/OrderedItemView"
], ($, _, Backbone, cartModel, OrderedItemView) ->

  OrderedItemsView = Backbone.View.extend

    initialize: ->
      @collection = cartModel.getOrderedItemsCollection()
      @_render()

    _render: ->
      _.each @collection.models, ((orderedItemModel) ->
        @_renderOrderedItem orderedItemModel
      ), this

    _renderOrderedItem: (orderedItemModel) ->
      orderedItemView = new OrderedItemView(model: orderedItemModel)
      @$el.append orderedItemView.$el