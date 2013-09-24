(function() {
  define(["underscore", "backbone", "models/MenuComponentOptionArticleModel"], function(_, Backbone, MenuComponentOptionArticleModel) {
    "use strict";
    var MenuComponentOptionArticlesCollection;
    MenuComponentOptionArticlesCollection = Backbone.Collection.extend({
      model: MenuComponentOptionArticleModel
    });
    return MenuComponentOptionArticlesCollection;
  });

}).call(this);
