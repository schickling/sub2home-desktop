(function() {
  define(["underscore", "backbone", "models/IngredientModel"], function(_, Backbone, IngredientModel) {
    var IngredientsCollection;
    IngredientsCollection = Backbone.Collection.extend({
      model: IngredientModel
    });
    return IngredientsCollection;
  });

}).call(this);
