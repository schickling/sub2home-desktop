define(["jquery", "underscore", "backbone", "services/notificationcenter", "views/store/assortment/ItemBaseView", "text!templates/store/assortment/articles/ArticleTemplate.html"], function($, _, Backbone, notificationcenter, ItemBaseView, ArticleTemplate) {
  var ArticleView;
  return ArticleView = ItemBaseView.extend({
    template: _.template(ArticleTemplate),
    className: "article",
    _toggleIsActive: function() {
      var $el, $eye, articleModel, isActive;
      articleModel = this.model;
      $eye = this.$(".bEye");
      $el = this.$el;
      isActive = !this.model.get("isActive");
      if (!isActive && this._isLastActiveArticle()) {
        notificationcenter.notify("views.store.assortment.articles.oneActiveArticleNeeded");
        return;
      }
      articleModel.set("isActive", isActive);
      return articleModel.save({}, {
        success: function() {
          $eye.toggleClass("open", isActive);
          $el.toggleClass("inactive", !isActive);
          if (isActive) {
            return notificationcenter.notify("views.store.assortment.articles.success.isActive");
          } else {
            return notificationcenter.notify("views.store.assortment.articles.success.isNotActive");
          }
        },
        error: function() {
          notificationcenter.notify("views.store.assortment.articles.error");
          return articleModel.set("isActive", !isActive);
        }
      });
    },
    _isLastActiveArticle: function() {
      var activeArticleCounter, articleModel, articlesCollection, categoriesCollection, tempArticlesCollection;
      activeArticleCounter = 0;
      articleModel = this.model;
      articlesCollection = articleModel.collection;
      categoriesCollection = articlesCollection.categoryModel.collection;
      tempArticlesCollection = void 0;
      _.each(categoriesCollection.models, function(tempCategoryModel) {
        tempArticlesCollection = tempCategoryModel.get("articlesCollection");
        return _.each(tempArticlesCollection.models, function(tempArticleModel) {
          if (tempArticleModel.get("isActive")) {
            return activeArticleCounter++;
          }
        });
      });
      return activeArticleCounter < 2;
    }
  });
});

/*
//@ sourceMappingURL=ArticleView.js.map
*/