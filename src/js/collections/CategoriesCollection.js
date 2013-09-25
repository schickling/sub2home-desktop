(function() {
  define(["underscore", "backbone", "models/CategoryModel"], function(_, Backbone, CategoryModel) {
    var CategoriesCollection;
    CategoriesCollection = Backbone.Collection.extend({
      model: CategoryModel,
      url: "stores/storeAlias/categories"
    });
    return CategoriesCollection;
  });

}).call(this);
