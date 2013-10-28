define(["underscore", "backbone", "collections/ArticlesCollection", "collections/ItemsCollection"], function(_, Backbone, ArticlesCollection, ItemsCollection) {
  var CategoryModel;
  return CategoryModel = Backbone.Model.extend({
    defaults: {
      itemsCollection: null,
      smallImage: "",
      icon: ""
    },
    parse: function(response) {
      if (response.hasOwnProperty("itemsCollection")) {
        response.itemsCollection = new ItemsCollection(response.itemsCollection);
      }
      if (response.hasOwnProperty("articlesCollection")) {
        response.articlesCollection = new ArticlesCollection(response.articlesCollection);
      }
      return response;
    }
  });
});

/*
//@ sourceMappingURL=CategoryModel.js.map
*/