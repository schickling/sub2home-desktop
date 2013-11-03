define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "views/store/assortment/ItemBaseView"
  "text!templates/store/assortment/articles/ArticleTemplate.html"
], ($, _, Backbone, notificationcenter, ItemBaseView, ArticleTemplate) ->

  ArticleView = ItemBaseView.extend

    template: _.template(ArticleTemplate)

    className: "article"

    _toggleIsActive: ->
      articleModel = @model
      $eye = @$(".bEye")
      $el = @$el
      isActive = not @model.get("isActive")
      if not isActive and @_isLastActiveArticle()
        notificationcenter.notify "views.store.assortment.articles.oneActiveArticleNeeded"
        return
      articleModel.set "isActive", isActive
      articleModel.save {},
        success: ->
          $eye.toggleClass "open", isActive
          $el.toggleClass "inactive", not isActive
          if isActive
            notificationcenter.notify "views.store.assortment.articles.success.isActive"
          else
            notificationcenter.notify "views.store.assortment.articles.success.isNotActive"

        error: ->
          notificationcenter.notify "views.store.assortment.articles.error"
          articleModel.set "isActive", not isActive

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


