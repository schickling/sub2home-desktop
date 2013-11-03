define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/dashboard/details/IngredientCategoryView"
], ($, _, Backbone, IngredientCategoryView) ->

  IngredientCategoriesView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      _.each @collection.models, ((ingredientCategoryModel) ->
        @_renderIngredientCategory ingredientCategoryModel
      ), this

    _renderIngredientCategory: (ingredientCategoryModel) ->
      ingredientCategoryView = new IngredientCategoryView(model: ingredientCategoryModel)
      @$el.append ingredientCategoryView.el


