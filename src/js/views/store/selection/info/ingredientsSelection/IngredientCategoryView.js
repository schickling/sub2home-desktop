define(["jquery", "underscore", "backbone", "views/store/selection/info/ingredientsSelection/IngredientsView", "text!templates/store/selection/info/ingredientsSelection/IngredientCategoryTemplate.html"], function($, _, Backbone, IngredientsView, IngredientCategoryTemplate) {
  var IngredientCategoryView;
  return IngredientCategoryView = Backbone.View.extend({
    className: "ingredientCategory",
    template: _.template(IngredientCategoryTemplate),
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var ingredientsView, json;
      json = {
        title: this.model.get("title")
      };
      this.$el.html(this.template(json));
      return ingredientsView = new IngredientsView({
        collection: this.model.get("ingredientsCollection"),
        el: this.$(".ingredients"),
        selectionView: this.options.selectionView,
        model: this.model
      });
    }
  });
});

/*
//@ sourceMappingURL=IngredientCategoryView.js.map
*/