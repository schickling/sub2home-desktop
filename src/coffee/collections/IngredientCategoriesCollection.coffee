define ["underscore", "backbone", "models/IngredientCategoryModel", "collections/IngredientsCollection"], (_, Backbone, IngredientCategoryModel, IngredientsCollection) ->

  IngredientCategoriesCollection = Backbone.Collection.extend

    model: IngredientCategoryModel

    url: "stores/storeAlias/ingredientcategories"

    getAllSelectedIngredientModels: ->
      ingredientModels = []
      _.each @models, (ingredientsCategoryModel) ->
        ingredientsCollection = ingredientsCategoryModel.get("ingredientsCollection")
        _.each ingredientsCollection.models, (ingredientModel) ->
          ingredientModels.push ingredientModel  if ingredientModel.get("isSelected")

      ingredientModels
