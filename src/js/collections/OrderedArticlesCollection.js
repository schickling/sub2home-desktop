(function() {
  define(["underscore", "backbone", "models/OrderedArticleModel"], function(_, Backbone, OrderedArticleModel) {
    "use strict";
    var OrderedArticlesCollection;
    OrderedArticlesCollection = Backbone.Collection.extend({
      model: OrderedArticleModel
    });
    return OrderedArticlesCollection;
  });

}).call(this);
