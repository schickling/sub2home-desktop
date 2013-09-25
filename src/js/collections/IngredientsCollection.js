define(["underscore", "backbone", "models/IngredientModel"], function(_, Backbone, IngredientModel) {
  var IngredientsCollection;
  return IngredientsCollection = Backbone.Collection.extend({
    model: IngredientModel
  });
});
