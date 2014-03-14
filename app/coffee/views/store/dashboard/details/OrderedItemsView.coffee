define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/dashboard/details/OrderedItemArticleView"
  "views/store/dashboard/details/OrderedItemMenuView"
], ($, _, Backbone, OrderedItemArticleView, OrderedItemMenuView) ->

  OrderedItemsView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      @collection.each @_renderOrderedItem, this

    _renderOrderedItem: (orderedItemModel) ->
      if orderedItemModel.isMenu()
        view = new OrderedItemMenuView model: orderedItemModel
        @$el.append view.el
      else
        ordererdArticleModel = orderedItemModel.get("orderedArticlesCollection").first()
        view = new OrderedItemArticleView
          model: ordererdArticleModel
          amount: orderedItemModel.get "amount"
        @$el.append view.el