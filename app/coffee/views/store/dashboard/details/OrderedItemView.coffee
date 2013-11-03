define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/dashboard/details/OrderedArticlesView"
  "text!templates/store/dashboard/details/OrderedItemTemplate.html"
], ($, _, Backbone, OrderedArticlesView, OrderedItemTemplate) ->

  OrderedItemView = Backbone.View.extend

    className: "orderedItem"
    template: _.template(OrderedItemTemplate)

    initialize: ->
      @_render()

    _render: ->
      amount = @model.get("amount")
      json =
        amount: amount
        total: @model.get("total") / amount
        isMenu: false
        menuTitle: "Spar Menu"

      @$el.html @template(json)
      @_renderOrderedArticles()

    _renderOrderedArticles: ->
      new OrderedArticlesView(
        el: @$(".orderedArticles")
        collection: @model.get("orderedArticlesCollection")
      )

