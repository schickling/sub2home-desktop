define(["jquery", "underscore", "backbone", "collections/IngredientCategoriesCollection", "views/store/assortment/SectionBaseView", "views/store/assortment/ingredients/IngredientCategoryView", "views/store/assortment/ingredients/ControlView"], function($, _, Backbone, IngredientCategoriesCollection, SectionBaseView, IngredientCategoryView, ControlView) {
  var IngredientCategoriesView;
  return IngredientCategoriesView = SectionBaseView.extend({
    controlViewClass: ControlView,
    collectionClass: IngredientCategoriesCollection,
    className: "ingredients",
    _fetchCollection: function() {
      var self;
      self = this;
      return this.collection.fetch({
        success: function() {
          return self._renderContent();
        }
      });
    },
    _renderContent: function() {
      return _.each(this.collection.models, (function(ingredientCategoryModel) {
        return this._renderIngredientCategory(ingredientCategoryModel);
      }), this);
    },
    _renderIngredientCategory: function(ingredientCategoryModel) {
      var ingredientCategoryView;
      ingredientCategoryView = new IngredientCategoryView({
        model: ingredientCategoryModel
      });
      return this.$content.append(ingredientCategoryView.el);
    }
  });
});

/*
//@ sourceMappingURL=IngredientCategoriesView.js.map
*/