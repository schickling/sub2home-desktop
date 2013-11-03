define [
  "jquery"
  "underscore"
  "backbone"
  "collections/IngredientCategoriesCollection"
  "views/store/assortment/SectionBaseView"
  "views/store/assortment/ingredients/IngredientCategoryView"
  "views/store/assortment/ingredients/ControlView"
], ($, _, Backbone, IngredientCategoriesCollection, SectionBaseView, IngredientCategoryView, ControlView) ->

  IngredientCategoriesView = SectionBaseView.extend

    controlViewClass: ControlView
    collectionClass: IngredientCategoriesCollection
    className: "ingredients"

    _fetchCollection: ->
      self = this
      @collection.fetch success: ->
        self._renderContent()

    _renderContent: ->
      _.each @collection.models, ((ingredientCategoryModel) ->
        @_renderIngredientCategory ingredientCategoryModel
      ), this

    _renderIngredientCategory: (ingredientCategoryModel) ->
      ingredientCategoryView = new IngredientCategoryView(model: ingredientCategoryModel)
      @$content.append ingredientCategoryView.el

