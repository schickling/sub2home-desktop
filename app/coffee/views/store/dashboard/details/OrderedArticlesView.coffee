define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/dashboard/details/OrderedArticleView"
], ($, _, Backbone, OrderedArticleView) ->

  OrderedArticlesView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      _.each @collection.models, ((orderedArticleModel) ->
        @_renderOrderedArticle orderedArticleModel
      ), this

    _renderOrderedArticle: (orderedArticleModel) ->
      orderedArticleView = new OrderedArticleView(model: orderedArticleModel)
      @$el.append orderedArticleView.el

