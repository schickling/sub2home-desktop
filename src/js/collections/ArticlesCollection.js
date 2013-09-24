(function() {
  define(["underscore", "backbone", "models/ArticleModel"], function(_, Backbone, ArticleModel) {
    "use strict";
    var ArticlesCollection;
    ArticlesCollection = Backbone.Collection.extend({
      model: ArticleModel
    });
    return ArticlesCollection;
  });

}).call(this);
