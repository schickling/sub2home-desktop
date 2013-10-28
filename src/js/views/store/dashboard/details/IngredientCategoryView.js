define(["jquery", "underscore", "backbone", "text!templates/store/dashboard/details/IngredientCategoryTemplate.html"], function($, _, Backbone, IngredientCategoryTemplate) {
  var IngredientCategoryView;
  return IngredientCategoryView = Backbone.View.extend({
    className: "ingredientCategory",
    template: _.template(IngredientCategoryTemplate),
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {
        title: this.model.get("title")
      };
      this.$el.html(this.template(json));
      return this._renderIngredients();
    },
    _renderIngredients: function() {
      var $ingredients, ingredientsCollection;
      ingredientsCollection = this.model.get("ingredientsCollection");
      $ingredients = this.$(".ingredients");
      return _.each(ingredientsCollection.models, function(ingredientModel) {
        return $ingredients.append("<span>" + ingredientModel.get("shortcut") + "</span>");
      });
    }
  });
});

/*
//@ sourceMappingURL=IngredientCategoryView.js.map
*/