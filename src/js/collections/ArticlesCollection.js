(function() {
  define(["underscore", "backbone", "models/ArticleModel"], function(_, Backbone, ArticleModel) {
    var ArticlesCollection;
    ArticlesCollection = Backbone.Collection.extend({
      model: ArticleModel
    });
    return ArticlesCollection;
  });

}).call(this);
