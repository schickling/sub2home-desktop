define(["jquery", "underscore", "backbone", "views/store/assortment/articles/ArticleView"], function($, _, Backbone, ArticleView) {
  var ArticlesView;
  return ArticlesView = Backbone.View.extend({
    initialize: function() {
      return this._render();
    },
    _render: function() {
      return _.each(this.collection.models, (function(articleModel) {
        return this._renderArticle(articleModel);
      }), this);
    },
    _renderArticle: function(articleModel) {
      var articleView;
      articleView = new ArticleView({
        model: articleModel
      });
      return this.$el.append(articleView.el);
    }
  });
});

/*
//@ sourceMappingURL=ArticlesView.js.map
*/