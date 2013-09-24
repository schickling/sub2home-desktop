define ["underscore", "backbone", "models/IngredientModel"], (_, Backbone, IngredientModel) ->
  "use strict"
  IngredientsCollection = Backbone.Collection.extend(model: IngredientModel)
  IngredientsCollection
