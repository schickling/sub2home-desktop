define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/stage/ingredientsSelection/IngredientCategoryView"
], ($, _, Backbone, IngredientCategoryView) ->

  IngredientCategoriesView = Backbone.View.extend

    initialize: ->
      articleModel = @model.get("articleModel")
      if articleModel
        @collection = articleModel.get("ingredientCategoriesCollection")
        @_render()

    _render: ->
      _.each @collection.models, ((ingredientCategoryModel) ->
        @_renderIngredientCategory ingredientCategoryModel
      ), this

    _renderIngredientCategory: (ingredientCategoryModel) ->
      ingredientCategoryView = new IngredientCategoryView(
        model: ingredientCategoryModel
        el: @$el
      )

