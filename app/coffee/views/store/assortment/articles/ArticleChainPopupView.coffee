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
      "click .bClose": "_close"
      "click #editAllChainedArticles": "_toggleAll"
      "click #chainedArticleBase": "_toggle"

    initialize: ->
      @_render()

    _render: ->
      json =
        isActive: @model.get "isActive"
        title: @model.get "title"
        info: @model.get "info"
        image: @model.get "smallImage"
      @$el.html @template(json)
      @_renderChainedArticles()
      @$el.fadeIn()

    _renderChainedArticles: ->
      $chainedArticleList = @$("#chainedArticleList")
      chainedArticlesCollection = @model.get "chainedArticlesCollection"
      chainedArticlesCollection.each (chainedArticleModel) =>
        chainedArticleView = new ChainedArticleView model: chainedArticleModel
        $chainedArticleList.append chainedArticleView.el

    _close: ->
      @$el.fadeOut()
      @undelegateEvents()

    _toggle: ->
      isActive = not @model.get "isActive"
      @model.save isActive: isActive
      @model.trigger "renderAgain"
      @_close()

    _toggleAll: ->
      deffereds = []
      isActive = not @model.get "isActive"
      deffereds.push @model.save(isActive: isActive)
      @model.trigger "renderAgain"
      chainedArticlesCollection = @model.get "chainedArticlesCollection"
      chainedArticlesCollection.each (chainedArticleModel) =>
        deffereds.push chainedArticleModel.save(isActive: isActive)
        articleModel = @model.collection.findWhere id: chainedArticleModel.get "id"
        if articleModel
          articleModel.set isActive: isActive
          articleModel.trigger "renderAgain"
      $.when.apply($, deffereds).then =>
        @_close()