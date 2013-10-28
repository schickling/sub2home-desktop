define(["jquery", "underscore", "backbone", "collections/CategoriesCollection", "views/store/assortment/SectionBaseView", "views/store/assortment/articles/CategoryView", "views/store/assortment/articles/ControlView"], function($, _, Backbone, CategoriesCollection, SectionBaseView, CategoryView, ControlView) {
  var CategoriesView;
  return CategoriesView = SectionBaseView.extend({
    controlViewClass: ControlView,
    collectionClass: CategoriesCollection,
    className: "articles",
    _fetchCollection: function() {
      var self;
      self = this;
      return this.collection.fetch({
        url: "stores/storeAlias/categories/assortment",
        success: function() {
          return self._renderContent();
        }
      });
    },
    _renderContent: function() {
      return _.each(this.collection.models, (function(categoryModel) {
        return this._renderCategory(categoryModel);
      }), this);
    },
    _renderCategory: function(categoryModel) {
      var categoryView;
      categoryView = new CategoryView({
        model: categoryModel
      });
      return this.$content.append(categoryView.el);
    }
  });
});

/*
//@ sourceMappingURL=CategoriesView.js.map
*/