define(["jquery", "underscore", "backbone", "views/store/selection/info/ingredientsSelection/IngredientCategoryView"], function($, _, Backbone, IngredientCategoryView) {
  var IngredientCategoriesView;
  return IngredientCategoriesView = Backbone.View.extend({
    $firstColumn: null,
    $secondColumn: null,
    isFirstColumn: true,
    initialize: function() {
      return this.render();
    },
    render: function() {
      this.$firstColumn = this.$(".ingredientCategories").first();
      this.$secondColumn = this.$(".ingredientCategories").last();
      return _.each(this.collection.models, (function(ingredientCategoryModel) {
        return this.renderIngredientCategory(ingredientCategoryModel);
      }), this);
    },
    renderIngredientCategory: function(ingredientCategoryModel) {
      var ingredientCategoryView;
      ingredientCategoryView = new IngredientCategoryView({
        model: ingredientCategoryModel,
        selectionView: this.options.selectionView
      });
      if (this.isFirstColumn) {
        this.$firstColumn.append(ingredientCategoryView.el);
      } else {
        this.$secondColumn.append(ingredientCategoryView.el);
      }
      return this.isFirstColumn = !this.isFirstColumn;
    }
  });
});

/*
//@ sourceMappingURL=IngredientCategoriesView.js.map
*/