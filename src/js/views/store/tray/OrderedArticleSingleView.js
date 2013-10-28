define(["jquery", "underscore", "backbone", "text!templates/store/tray/OrderedArticleSingleTemplate.html"], function($, _, Backbone, OrderedArticleSingleTemplate) {
  var OrderedArticleSingleView;
  return OrderedArticleSingleView = Backbone.View.extend({
    template: _.template(OrderedArticleSingleTemplate),
    events: {
      mouseenter: "_showControls",
      mouseleave: "_hideControls"
    },
    $pricetag: null,
    $controls: null,
    initialize: function() {
      this._render();
      return this._cacheDom();
    },
    _render: function() {
      var articleModel, json, orderedArticleModel;
      orderedArticleModel = this.model.get("orderedArticlesCollection").first();
      articleModel = orderedArticleModel.get("articleModel");
      json = {
        title: articleModel.get("title"),
        image: articleModel.get("largeImage"),
        info: articleModel.get("info"),
        total: this.model.get("total") / this.model.get("amount"),
        amount: this.model.get("amount"),
        description: this._getDescription()
      };
      this.$el.html(this.template(json));
      return this.$el.addClass("orderedArticle");
    },
    _cacheDom: function() {
      this.$pricetag = this.$(".pricetag");
      return this.$controls = this.$(".controls");
    },
    _showControls: function() {
      this.$pricetag.stop().animate({
        right: 110
      }, 200);
      return this.$controls.delay(100).stop().fadeIn(100);
    },
    _hideControls: function() {
      this.$pricetag.stop().animate({
        right: 15
      }, 200);
      return this.$controls.stop().fadeOut(100);
    },
    _getDescription: function() {
      var articleModel, description, i, ingredientCategoriesCollection, ingredientModels, ingredientTitle, orderedArticleModel;
      orderedArticleModel = this.model.get("orderedArticlesCollection").first();
      articleModel = orderedArticleModel.get("articleModel");
      description = articleModel.get("description");
      if (articleModel.hasIngredients()) {
        ingredientCategoriesCollection = articleModel.get("ingredientCategoriesCollection");
        ingredientModels = ingredientCategoriesCollection.getAllSelectedIngredientModels();
        i = 0;
        while (i < ingredientModels.length) {
          ingredientTitle = ingredientModels[i].get("shortTitle");
          if (i > 0) {
            if (i === ingredientModels.length - 1) {
              description += " und " + ingredientTitle;
            } else {
              description += ", " + ingredientTitle;
            }
          } else {
            description = ingredientTitle;
          }
          i++;
        }
      }
      return description;
    }
  });
});

/*
//@ sourceMappingURL=OrderedArticleSingleView.js.map
*/