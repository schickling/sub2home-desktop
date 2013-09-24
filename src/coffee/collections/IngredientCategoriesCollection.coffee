define ["underscore", "backbone", "models/IngredientCategoryModel", "collections/IngredientsCollection"], (_, Backbone, IngredientCategoryModel, IngredientsCollection) ->
  "use strict"
  IngredientCategoriesCollection = Backbone.Collection.extend(
    model: IngredientCategoryModel
    getAllSelectedIngredientModels: ->
      ingredientModels = []
      _.each @models, (ingredientsCategoryModel) ->
        ingredientsCollection = ingredientsCategoryModel.get("ingredientsCollection")
        _.each ingredientsCollection.models, (ingredientModel) ->
          ingredientModels.push ingredientModel  if ingredientModel.get("isSelected")


      ingredientModels

    url: ->
      "stores/storeAlias/ingredientcategories"
  )
  IngredientCategoriesCollection
