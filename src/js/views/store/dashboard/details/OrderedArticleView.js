define(["jquery", "underscore", "backbone", "views/store/dashboard/details/IngredientCategoriesView", "text!templates/store/dashboard/details/OrderedArticleTemplate.html"], function($, _, Backbone, IngredientCategoriesView, OrderedArticleTemplate) {
  var OrderedArticleView;
  return OrderedArticleView = Backbone.View.extend({
    className: "orderedArticle",
    template: _.template(OrderedArticleTemplate),
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var articleModel, json, orderedArticleModel;
      orderedArticleModel = this.model;
      articleModel = orderedArticleModel.get("articleModel");
      json = {
        title: articleModel.get("title")
      };
      this.$el.html(this.template(json));
      if (articleModel.hasIngredients()) {
        return this._renderIngredientCategories();
      }
    },
    _renderIngredientCategories: function() {
      var articleModel, ingredientCategoriesCollection;
      articleModel = this.model.get("articleModel");
      ingredientCategoriesCollection = articleModel.get("ingredientCategoriesCollection");
      return new IngredientCategoriesView({
        el: this.$(".articleIngredients"),
        collection: ingredientCategoriesCollection
      });
    }
  });
});

/*
//@ sourceMappingURL=OrderedArticleView.js.map
*/