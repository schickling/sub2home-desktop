(function() {
  define(["underscore", "backbone", "models/MenuComponentOptionArticleModel"], function(_, Backbone, MenuComponentOptionArticleModel) {
    var MenuComponentOptionArticlesCollection;
    MenuComponentOptionArticlesCollection = Backbone.Collection.extend({
      model: MenuComponentOptionArticleModel
    });
    return MenuComponentOptionArticlesCollection;
  });

}).call(this);
