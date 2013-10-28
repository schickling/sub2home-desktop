define(["underscore", "backbone", "models/ArticleModel", "models/MenuUpgradeModel", "models/MenuComponentBlockModel"], function(_, Backbone, ArticleModel, MenuUpgradeModel, MenuComponentBlockModel) {
  var OrderedArticleModel;
  return OrderedArticleModel = Backbone.Model.extend({
    defaults: {
      orderedItemModel: null,
      articleModel: null,
      menuUpgradeModel: null,
      menuComponentBlockModel: null
    },
    initialize: function() {
      return this.on("change:articleModel", (function() {
        var articleModel, previousArticleModel;
        previousArticleModel = this.previous("articleModel");
        articleModel = this.get("articleModel");
        this.trigger("priceChanged");
        if (previousArticleModel) {
          previousArticleModel.off("change:total");
        }
        return articleModel.on("change:total", (function() {
          return this.trigger("priceChanged");
        }), this);
      }), this);
    },
    toJSON: function() {
      var attributes;
      attributes = _.clone(this.attributes);
      if (this.get("articleModel")) {
        attributes.articleModel = attributes.articleModel.toJSON();
      }
      if (this.get("menuUpgradeModel")) {
        attributes.menuUpgradeModel = attributes.menuUpgradeModel.toJSON();
      }
      if (this.get("menuComponentBlockModel")) {
        attributes.menuComponentBlockModel = attributes.menuComponentBlockModel.toJSON();
      }
      delete attributes.orderedItemModel;
      return attributes;
    },
    parse: function(response) {
      if (response.hasOwnProperty("articleModel") && response.articleModel !== null) {
        response.articleModel = new ArticleModel(response.articleModel, {
          parse: true
        });
      }
      if (response.hasOwnProperty("menuUpgradeModel") && response.menuUpgradeModel !== null) {
        response.menuUpgradeModel = new MenuUpgradeModel(response.menuUpgradeModel, {
          parse: true
        });
      }
      if (response.hasOwnProperty("menuComponentBlockModel") && response.menuComponentBlockModel !== null) {
        response.menuComponentBlockModel = new MenuComponentBlockModel(response.menuComponentBlockModel, {
          parse: true
        });
      }
      return response;
    },
    isMenuUpgradeBase: function() {
      return this.get("menuComponentBlockModel") === null && this.get("articleModel") !== null;
    },
    hasBeenUpgraded: function() {
      return this.get("menuUpgradeModel") !== null;
    },
    isComplete: function() {
      var isComplete;
      if (!(this.get("articleModel") && this.get("articleModel").get("ingredientCategoriesCollection"))) {
        return true;
      }
      isComplete = true;
      this.get("articleModel").get("ingredientCategoriesCollection").each(function(ingredientCategoryModel) {
        if (!ingredientCategoryModel.isComplete()) {
          return isComplete = false;
        }
      });
      return isComplete;
    }
  });
});

/*
//@ sourceMappingURL=OrderedArticleModel.js.map
*/