define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "views/store/assortment/articles/ChainedArticleView"
  "text!templates/store/assortment/articles/ArticleChainPopupTemplate.html"
], ($, _, Backbone, notificationcenter, ChainedArticleView, ArticleChainPopupTemplate) ->

  ArticleChainPopupView = Backbone.View.extend

    template: _.template(ArticleChainPopupTemplate)

    events:
      "click #editAllChainedArticles": "_toggleAll"
      "click #cancelArticleChainEdit": "_toggle"
      "click #submitArticleChainEdit": "_submit"

    initialize: ->
      @_render()
      @_listenToCollection()

    _render: ->
      articleChainModel = @model.get "articleChainModel"
      json =
        chainTitle: articleChainModel.get "title"
        isActive: @model.get "isActive"
        articleTitle: @model.get "title"
        info: @model.get "info"
        image: @model.get "smallImage"
      @$el.html @template(json)
      @_renderChainedArticles()
      @$el.fadeIn()

    _listenToCollection: ->
      articleChainModel = @model.get "articleChainModel"
      articlesCollection = articleChainModel.get "articlesCollection"
      @listenToOnce articlesCollection, "change", =>
        @$("#submitArticleChainEdit").removeClass "disabled"

    _renderChainedArticles: ->
      $chainedArticleList = @$("#articleChainPreview")
      articleChainModel = @model.get "articleChainModel"
      articlesCollection = articleChainModel.get "articlesCollection"
      articlesCollection.each (articleModel) ->
        chainedArticleView = new ChainedArticleView model: articleModel
        $chainedArticleList.append chainedArticleView.el

    _toggle: ->
      isActive = not @model.get "isActive"
      @model.save isActive: isActive
      @model.trigger "renderAgain"
      @_close()

    _toggleAll: ->
      articleChainModel = @model.get "articleChainModel"
      articlesCollection = articleChainModel.get "articlesCollection"
      articlesCollection.each (articleModel) =>
        articleModel.set "isActive", not @model.get("isActive")

    _close: ->
      @$el.fadeOut()
      @undelegateEvents()

    _submit: ->
      deffereds = []
      articleChainModel = @model.get "articleChainModel"
      articlesCollection = articleChainModel.get "articlesCollection"
      articlesCollection.each (articleModel) =>
        deffereds.push articleModel.save()
      $.when.apply($, deffereds).then =>
        @_close()
        window.location.reload()
