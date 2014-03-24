define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "views/store/assortment/ItemBaseView"
  "views/store/assortment/articles/ArticleChainPopupView"
  "text!templates/store/assortment/articles/ArticleTemplate.html"
], ($, _, Backbone, notificationcenter, ItemBaseView, ArticleChainPopupView, ArticleTemplate) ->

  ArticleView = ItemBaseView.extend

    template: _.template(ArticleTemplate)

    className: "article"

    _toggleIsActive: ->
      if @model.get "articleChainModel"
        new ArticleChainPopupView
          el: $("#articleChainPopup")
          model: @model
        return

      $eye = @$(".bEye")
      isActive = not @model.get("isActive")
      if not isActive and @_isLastActiveArticle()
        notificationcenter.notify "views.store.assortment.articles.oneActiveArticleNeeded"
        return
      @model.set "isActive", isActive
      @model.save {},
        success: =>
          $eye.toggleClass "open", isActive
          @$el.toggleClass "inactive", not isActive
          if isActive
            notificationcenter.notify "views.store.assortment.items.success.isActive"
          else
            notificationcenter.notify "views.store.assortment.items.success.isNotActive"

        error: =>
          notificationcenter.notify "views.store.assortment.articles.error"
          @model.set "isActive", not isActive

    _isLastActiveArticle: ->
      activeArticleCounter = 0
      articleModel = @model
      articlesCollection = articleModel.collection
      categoriesCollection = articlesCollection.categoryModel.collection
      tempArticlesCollection = undefined
      _.each categoriesCollection.models, (tempCategoryModel) ->
        tempArticlesCollection = tempCategoryModel.get("articlesCollection")
        _.each tempArticlesCollection.models, (tempArticleModel) ->
          activeArticleCounter++  if tempArticleModel.get("isActive")

      activeArticleCounter < 2


