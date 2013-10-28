define(["jquery", "underscore", "backbone", "views/store/selection/stage/ingredientsSelection/IngredientCategoryView"], function($, _, Backbone, IngredientCategoryView) {
  var IngredientCategoriesView;
  return IngredientCategoriesView = Backbone.View.extend({
    initialize: function() {
      var articleModel;
      articleModel = this.model.get("articleModel");
      if (articleModel) {
        this.collection = articleModel.get("ingredientCategoriesCollection");
        return this._render();
      }
    },
    _render: function() {
      return _.each(this.collection.models, (function(ingredientCategoryModel) {
        return this._renderIngredientCategory(ingredientCategoryModel);
      }), this);
    },
    _renderIngredientCategory: function(ingredientCategoryModel) {
      var ingredientCategoryView;
      return ingredientCategoryView = new IngredientCategoryView({
        model: ingredientCategoryModel,
        el: this.$el
      });
    }
  });
});

/*
//@ sourceMappingURL=IngredientCategoriesView.js.map
*/