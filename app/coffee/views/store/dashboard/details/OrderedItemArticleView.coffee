define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/dashboard/details/OrderedItemArticleTemplate.html"
], ($, _, Backbone, OrderedItemArticleTemplate) ->

  OrderedItemArticleView = Backbone.View.extend

    template: _.template(OrderedItemArticleTemplate)

    className: "articleInOrder"

    initialize: ->
      @_render()

    _render: ->
      articleModel = @model.get "articleModel"
      categoryModel = articleModel.get "categoryModel"
      json =
        amount: @options.amount
        categoryTitle: categoryModel.get "title"
        articleTitle: articleModel.get "title"
        info: articleModel.get "info"
        ingredientsString: @_getIngredientsString()

      @$el.html @template(json)

    _getIngredientsString: ->
      ingredientsString = ""
      articleModel = @model.get "articleModel"
      ingredientCategoriesCollection = articleModel.get "ingredientCategoriesCollection"
      if ingredientCategoriesCollection
        ingredientCategoriesCollection.each (ingredientsCategoryModel) ->
          ingredientsCollection = ingredientsCategoryModel.get "ingredientsCollection"
          ingredientsCategoryTitle = ingredientsCategoryModel.get "title"
          ingredientsString += "<div>#{ingredientsCategoryTitle} "
          ingredientsCollection.each (ingredientModel) ->
            shortcut = ingredientModel.get "shortcut"
            ingredientsString += "<span>#{shortcut}</span> "
          ingredientsString += "</div>"
      ingredientsString