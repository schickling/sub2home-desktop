define(["underscore", "backbone", "models/ArticleModel"], function(_, Backbone, ArticleModel) {
  var ArticlesCollection;
  return ArticlesCollection = Backbone.Collection.extend({
    model: ArticleModel
  });
});
