define(["underscore", "backbone", "models/OrderedArticleModel"], function(_, Backbone, OrderedArticleModel) {
  var OrderedArticlesCollection;
  return OrderedArticlesCollection = Backbone.Collection.extend({
    model: OrderedArticleModel
  });
});

/*
//@ sourceMappingURL=OrderedArticlesCollection.js.map
*/