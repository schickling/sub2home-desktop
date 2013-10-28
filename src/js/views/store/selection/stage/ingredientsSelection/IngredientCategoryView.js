define(["jquery", "underscore", "backbone", "views/store/selection/stage/SlideView", "views/store/selection/stage/ingredientsSelection/IngredientsView"], function($, _, Backbone, SlideView, IngredientsView) {
  var IngredientCategoryView;
  return IngredientCategoryView = SlideView.extend({
    afterInitialize: function() {
      this.$el.addClass("ingredientCategory");
      this.$el.toggleClass("isSingle", !!this.model.get("isSingle"));
      return this.renderIngredients();
    },
    renderIngredients: function() {
      var ingredientsView;
      return ingredientsView = new IngredientsView({
        collection: this.model.get("ingredientsCollection"),
        model: this.model,
        el: this.$el
      });
    }
  });
});

/*
//@ sourceMappingURL=IngredientCategoryView.js.map
*/