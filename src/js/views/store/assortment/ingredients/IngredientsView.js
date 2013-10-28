define(["jquery", "underscore", "backbone", "views/store/assortment/ingredients/IngredientView"], function($, _, Backbone, IngredientView) {
  var IngredientsView;
  return IngredientsView = Backbone.View.extend({
    initialize: function() {
      return this._render();
    },
    _render: function() {
      return _.each(this.collection.models, (function(ingredientModel) {
        return this._renderIngredient(ingredientModel);
      }), this);
    },
    _renderIngredient: function(ingredientModel) {
      var ingredientView;
      ingredientView = new IngredientView({
        model: ingredientModel
      });
      return this.$el.append(ingredientView.el);
    }
  });
});

/*
//@ sourceMappingURL=IngredientsView.js.map
*/