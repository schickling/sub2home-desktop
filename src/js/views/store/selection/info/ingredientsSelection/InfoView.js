define(["jquery", "underscore", "backbone", "views/store/selection/info/InfoBaseView", "views/store/selection/info/ingredientsSelection/ArticleView", "views/store/selection/info/ingredientsSelection/IngredientCategoriesView", "views/store/selection/info/ingredientsSelection/IngredientsView", "text!templates/store/selection/info/ingredientsSelection/InfoTemplate.html"], function($, _, Backbone, InfoBaseView, ArticleView, IngredientCategoriesView, IngredientsView, InfoTemplate) {
  var InfoView;
  return InfoView = InfoBaseView.extend({
    template: _.template(InfoTemplate),
    renderContent: function() {
      var articleModel;
      articleModel = this.model.get("articleModel");
      if (articleModel) {
        this.renderArticleView();
        if (articleModel.get("allowsIngredients")) {
          return this.renderIngredientCategoriesView();
        }
      }
    },
    renderArticleView: function() {
      return this.articleView = new ArticleView({
        model: this.model.get("articleModel"),
        el: this.$(".articleInfo"),
        selectionView: this.options.selectionView
      });
    },
    renderIngredientCategoriesView: function() {
      var articleModel;
      articleModel = this.model.get("articleModel");
      return this.ingredientCategoriesView = new IngredientCategoriesView({
        el: this.$(".ingredientInfo"),
        collection: articleModel.get("ingredientCategoriesCollection"),
        selectionView: this.options.selectionView
      });
    }
  });
});

/*
//@ sourceMappingURL=InfoView.js.map
*/