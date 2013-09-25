define(["underscore", "backbone", "models/CategoryModel"], function(_, Backbone, CategoryModel) {
  var CategoriesCollection;
  return CategoriesCollection = Backbone.Collection.extend({
    model: CategoryModel,
    url: "stores/storeAlias/categories"
  });
});
