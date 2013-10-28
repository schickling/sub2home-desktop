define(["jquery", "underscore", "backbone", "views/store/assortment/ControlBaseView"], function($, _, Backbone, ControlBaseView) {
  var ControlView;
  return ControlView = ControlBaseView.extend({
    events: {
      "click .bReset": "_resetAllPrices",
      "click .showAll": "_showAllIngredients"
    },
    _countItems: function() {
      var numberOfItems;
      numberOfItems = 0;
      _.each(this.collection.models, function(ingredientCategoryModel) {
        return numberOfItems += ingredientCategoryModel.get("ingredientsCollection").length;
      });
      return this.numberOfItems = numberOfItems;
    },
    _resetAllPrices: function() {
      _.each(this.collection.models, (function(ingredientCategoryModel) {
        var ingredientsCollection;
        ingredientsCollection = ingredientCategoryModel.get("ingredientsCollection");
        return _.each(ingredientsCollection.models, (function(ingredient) {
          if (ingredient.get("price") !== ingredient.get("customPrice")) {
            return this._updateModel(ingredient, {
              customPrice: ingredient.get("price")
            });
          }
        }), this);
      }), this);
      return this._updateLoadBar();
    },
    _showAllIngredients: function() {
      _.each(this.collection.models, (function(ingredientCategoryModel) {
        var ingredientsCollection;
        ingredientsCollection = ingredientCategoryModel.get("ingredientsCollection");
        return _.each(ingredientsCollection.models, (function(ingredientModel) {
          if (!ingredientModel.get("isActive")) {
            return this._updateModel(ingredientModel, {
              isActive: true
            });
          }
        }), this);
      }), this);
      return this._updateLoadBar();
    }
  });
});

/*
//@ sourceMappingURL=ControlView.js.map
*/