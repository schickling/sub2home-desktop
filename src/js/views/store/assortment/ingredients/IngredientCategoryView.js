define(["jquery", "underscore", "backbone", "views/store/assortment/ingredients/IngredientsView", "text!templates/store/assortment/ingredients/IngredientCategoryTemplate.html"], function($, _, Backbone, IngredientsView, IngredientCategoryTemplate) {
  var IngredientCategoryView;
  return IngredientCategoryView = Backbone.View.extend({
    className: "category",
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
      return new IngredientsView({
        el: this.$(".ingredients"),
        collection: this.model.get("ingredientsCollection")
      });
    }
  });
});

/*
//@ sourceMappingURL=IngredientCategoryView.js.map
*/