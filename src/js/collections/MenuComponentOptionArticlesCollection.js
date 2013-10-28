define(["underscore", "backbone", "models/MenuComponentOptionArticleModel"], function(_, Backbone, MenuComponentOptionArticleModel) {
  var MenuComponentOptionArticlesCollection;
  return MenuComponentOptionArticlesCollection = Backbone.Collection.extend({
    model: MenuComponentOptionArticleModel
  });
});

/*
//@ sourceMappingURL=MenuComponentOptionArticlesCollection.js.map
*/