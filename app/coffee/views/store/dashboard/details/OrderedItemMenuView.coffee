define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/dashboard/details/OrderedItemArticleView"
  "text!templates/store/dashboard/details/OrderedItemMenuTemplate.html"
], ($, _, Backbone, OrderedItemArticleView, OrderedItemMenuTemplate) ->

  OrderedItemMenuView = Backbone.View.extend

    template: _.template(OrderedItemMenuTemplate)

    className: "menuInOrder"

    initialize: ->
      @_render()
      @_renderArticles()

    _render: ->
      json =
        title: @model.getMenuTitle()
        amount: @model.get "amount"

      @$el.html @template(json)

    _renderArticles: ->
      orderedArticlesCollection = @model.get "orderedArticlesCollection"
      orderedArticlesCollection.each (orderedArticleModel) =>
        view = new OrderedItemArticleView
          model: orderedArticleModel
          amount: false
        @$el.append view.el
