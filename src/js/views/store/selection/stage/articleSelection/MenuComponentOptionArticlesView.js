define(["jquery", "underscore", "backbone", "views/store/selection/stage/articleSelection/MenuComponentOptionArticleView"], function($, _, Backbone, MenuComponentOptionArticleView) {
  var MenuComponentOptionArticlesView;
  return MenuComponentOptionArticlesView = Backbone.View.extend({
    initialize: function() {
      return this._render();
    },
    _render: function() {
      return _.each(this.collection.models, (function(menuComponentOptionArticleModel) {
        return this._renderArticle(menuComponentOptionArticleModel);
      }), this);
    },
    _renderArticle: function(menuComponentOptionArticleModel) {
      var menuComponentOptionArticleView;
      menuComponentOptionArticleView = new MenuComponentOptionArticleView({
        model: menuComponentOptionArticleModel,
        orderedArticleModel: this.options.orderedArticleModel,
        selectionView: this.options.selectionView
      });
      return this.$el.append(menuComponentOptionArticleView.el);
    }
  });
});

/*
//@ sourceMappingURL=MenuComponentOptionArticlesView.js.map
*/