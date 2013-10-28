define(["jquery", "libs/jquery.lazyload", "underscore", "backbone", "views/store/selection/stage/ingredientsSelection/IngredientView"], function($, jqueryLazyload, _, Backbone, IngredientView) {
  var IngredientsView;
  return IngredientsView = Backbone.View.extend({
    initialize: function() {
      return this.render();
    },
    render: function() {
      var $ingredients;
      $ingredients = this.$(".ingredients");
      $ingredients.empty();
      _.each(this.collection.models, (function(ingredientModel) {
        return this._renderIngredient(ingredientModel);
      }), this);
      return this.$el.lazyload();
    },
    _renderIngredient: function(ingredientModel) {
      var ingredientView;
      ingredientView = new IngredientView({
        model: ingredientModel
      });
      ingredientView.parentView = this;
      return this.$el.append(ingredientView.el);
    },
    notifyOtherIngredients: function(ingredientModel) {
      var isSingle, otherIngredients;
      otherIngredients = this.collection.without(ingredientModel);
      isSingle = this.model.get("isSingle");
      if (isSingle) {
        return _.each(otherIngredients, function(otherIngredientModel) {
          return otherIngredientModel.set("isSelected", false);
        });
      }
    }
  });
});

/*
//@ sourceMappingURL=IngredientsView.js.map
*/