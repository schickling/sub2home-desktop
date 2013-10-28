define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/articles/ArticlesView"
  "text!templates/store/assortment/articles/CategoryTemplate.html"
], ($, _, Backbone, ArticlesView, CategoryTemplate) ->

  CategoryView = Backbone.View.extend

    className: "category"
    template: _.template(CategoryTemplate)

    initialize: ->
      @_render()

    _render: ->
      json = title: @model.get("title")
      @$el.html @template(json)
      @_renderArticles()

    _renderArticles: ->
      # needed to check if article is last active article
      articlesCollection = @model.get("articlesCollection")
      articlesCollection.categoryModel = @model
      new ArticlesView(
        el: @$(".articles")
        collection: articlesCollection
      )

