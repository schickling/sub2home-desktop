define(["jquery", "underscore", "backbone", "views/store/dashboard/details/OrderedArticleView"], function($, _, Backbone, OrderedArticleView) {
  var OrderedArticlesView;
  return OrderedArticlesView = Backbone.View.extend({
    initialize: function() {
      return this._render();
    },
    _render: function() {
      return _.each(this.collection.models, (function(orderedArticleModel) {
        return this._renderOrderedArticle(orderedArticleModel);
      }), this);
    },
    _renderOrderedArticle: function(orderedArticleModel) {
      var orderedArticleView;
      orderedArticleView = new OrderedArticleView({
        model: orderedArticleModel
      });
      return this.$el.append(orderedArticleView.el);
    }
  });
});

/*
//@ sourceMappingURL=OrderedArticlesView.js.map
*/