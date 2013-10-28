define(["jquery", "underscore", "backbone", "views/store/selection/OrderedArticleView"], function($, _, Backbone, OrderedArticleView) {
  var OrderedArticlesView;
  return OrderedArticlesView = Backbone.View.extend({
    initialize: function() {
      this._render();
      return this.listenTo(this.collection, "add", this._renderOrderedArticle);
    },
    _render: function() {
      return _.each(this.collection.models, (function(orderedArticleModel) {
        return this._renderOrderedArticle(orderedArticleModel);
      }), this);
    },
    _renderOrderedArticle: function(orderedArticleModel) {
      var orderedArticleView;
      return orderedArticleView = new OrderedArticleView({
        model: orderedArticleModel,
        parentView: this,
        el: this.$el
      });
    },
    destroy: function() {
      this.stopListening();
      return this.trigger("destroy");
    }
  });
});

/*
//@ sourceMappingURL=OrderedArticlesView.js.map
*/