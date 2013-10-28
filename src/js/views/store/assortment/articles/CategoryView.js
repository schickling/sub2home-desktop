define(["jquery", "underscore", "backbone", "views/store/assortment/articles/ArticlesView", "text!templates/store/assortment/articles/CategoryTemplate.html"], function($, _, Backbone, ArticlesView, CategoryTemplate) {
  var CategoryView;
  return CategoryView = Backbone.View.extend({
    className: "category",
    template: _.template(CategoryTemplate),
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {
        title: this.model.get("title")
      };
      this.$el.html(this.template(json));
      return this._renderArticles();
    },
    _renderArticles: function() {
      var articlesCollection;
      articlesCollection = this.model.get("articlesCollection");
      articlesCollection.categoryModel = this.model;
      return new ArticlesView({
        el: this.$(".articles"),
        collection: articlesCollection
      });
    }
  });
});

/*
//@ sourceMappingURL=CategoryView.js.map
*/