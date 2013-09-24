(function() {
  define(["underscore", "backbone", "models/IngredientCategoryModel", "collections/IngredientsCollection"], function(_, Backbone, IngredientCategoryModel, IngredientsCollection) {
    "use strict";
    var IngredientCategoriesCollection;
    IngredientCategoriesCollection = Backbone.Collection.extend({
      model: IngredientCategoryModel,
      url: "stores/storeAlias/ingredientcategories",
      getAllSelectedIngredientModels: function() {
        var ingredientModels;
        ingredientModels = [];
        _.each(this.models, function(ingredientsCategoryModel) {
          var ingredientsCollection;
          ingredientsCollection = ingredientsCategoryModel.get("ingredientsCollection");
          return _.each(ingredientsCollection.models, function(ingredientModel) {
            if (ingredientModel.get("isSelected")) {
              return ingredientModels.push(ingredientModel);
            }
          });
        });
        return ingredientModels;
      }
    });
    return IngredientCategoriesCollection;
  });

}).call(this);
