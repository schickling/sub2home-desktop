define ["underscore", "backbone", "models/IngredientModel"], (_, Backbone, IngredientModel) ->

  IngredientsCollection = Backbone.Collection.extend

    model: IngredientModel
