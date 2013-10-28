define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/articles/ArticleView"
], ($, _, Backbone, ArticleView) ->

  ArticlesView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      _.each @collection.models, ((articleModel) ->
        @_renderArticle articleModel
      ), this

    _renderArticle: (articleModel) ->
      articleView = new ArticleView(model: articleModel)
      @$el.append articleView.el


