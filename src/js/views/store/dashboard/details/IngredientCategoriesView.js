define(["jquery", "underscore", "backbone", "views/store/dashboard/details/IngredientCategoryView"], function($, _, Backbone, IngredientCategoryView) {
  var IngredientCategoriesView;
  return IngredientCategoriesView = Backbone.View.extend({
    initialize: function() {
      return this._render();
    },
    _render: function() {
      return _.each(this.collection.models, (function(ingredientCategoryModel) {
        return this._renderIngredientCategory(ingredientCategoryModel);
      }), this);
    },
    _renderIngredientCategory: function(ingredientCategoryModel) {
      var ingredientCategoryView;
      ingredientCategoryView = new IngredientCategoryView({
        model: ingredientCategoryModel
      });
      return this.$el.append(ingredientCategoryView.el);
    }
  });
});

/*
//@ sourceMappingURL=IngredientCategoriesView.js.map
*/