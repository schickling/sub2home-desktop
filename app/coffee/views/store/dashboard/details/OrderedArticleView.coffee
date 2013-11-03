define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/dashboard/details/IngredientCategoriesView"
  "text!templates/store/dashboard/details/OrderedArticleTemplate.html"
], ($, _, Backbone, IngredientCategoriesView, OrderedArticleTemplate) ->

  OrderedArticleView = Backbone.View.extend

    className: "orderedArticle"
    template: _.template(OrderedArticleTemplate)

    initialize: ->
      @_render()

    _render: ->
      orderedArticleModel = @model
      articleModel = orderedArticleModel.get("articleModel")
      json = title: articleModel.get("title")
      @$el.html @template(json)
      @_renderIngredientCategories()  if articleModel.hasIngredients()

    _renderIngredientCategories: ->
      articleModel = @model.get("articleModel")
      ingredientCategoriesCollection = articleModel.get("ingredientCategoriesCollection")
      new IngredientCategoriesView(
        el: @$(".articleIngredients")
        collection: ingredientCategoriesCollection
      )

