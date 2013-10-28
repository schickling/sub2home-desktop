define(["jquery", "underscore", "backbone", "services/notificationcenter", "services/router", "models/cartModel", "models/ArticleModel", "models/OrderedItemModel", "views/store/home/ArticleDetailsView", "text!templates/store/home/ItemTemplate.html"], function($, _, Backbone, notificationcenter, router, cartModel, ArticleModel, OrderedItemModel, ArticleDetailsView, ItemTemplate) {
  var ItemView;
  return ItemView = Backbone.View.extend({
    template: _.template(ItemTemplate),
    className: "item",
    events: {
      "click .itemPreview, .itemDescription, h3": "_handleClick"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {
        title: this.model.get("title"),
        image: this.model.get("largeImage"),
        description: this.model.get("description"),
        price: this.model.get("price"),
        deposit: (this.model.get("deposit") || 0) * 100
      };
      this.$el.html(this.template(json));
      return this.$el.addClass(this._getImageClass());
    },
    _getImageClass: function() {
      var image, imageWithoutFileExtension;
      image = this.model.get("largeImage");
      imageWithoutFileExtension = image.substr(0, image.lastIndexOf("."));
      return imageWithoutFileExtension.split("-").pop() || "";
    },
    _handleClick: function() {
      if (this.model.has("allowsIngredients")) {
        if (this.model.get("allowsIngredients")) {
          if (this.model.get("attachedItemsCollection")) {
            return this._showDetails();
          } else {
            return router.navigate("store/theke/artikel/" + this.model.get("id"), true);
          }
        } else {
          return this._putArticleInCart();
        }
      } else {
        return router.navigate("store/theke/menu/" + this.model.get("id"), true);
      }
    },
    _showDetails: function() {
      var articleDetailsView, defaultOffset, minimumMargin, rect;
      articleDetailsView = new ArticleDetailsView({
        model: this.model
      });
      this.$el.append(articleDetailsView.el);
      rect = this.el.getBoundingClientRect();
      defaultOffset = 99;
      minimumMargin = 30;
      if (rect.left < minimumMargin + defaultOffset) {
        return articleDetailsView.$el.css({
          left: minimumMargin - rect.left
        });
      } else if (minimumMargin + defaultOffset > window.innerWidth - rect.right) {
        return articleDetailsView.$el.css({
          left: "auto",
          right: -(window.innerWidth - rect.right - minimumMargin)
        });
      }
    },
    _putArticleInCart: function() {
      var articleModel, orderedArticlesCollection, orderedItemModel;
      orderedItemModel = new OrderedItemModel();
      orderedArticlesCollection = orderedItemModel.get("orderedArticlesCollection");
      articleModel = new ArticleModel({
        id: this.model.get("id")
      });
      articleModel.fetch({
        async: false
      });
      orderedArticlesCollection.add({
        articleModel: articleModel
      });
      cartModel.addOrderedItemModel(orderedItemModel);
      return notificationcenter.notify("views.store.home.addedOrderedItemToCart");
    }
  });
});

/*
//@ sourceMappingURL=ItemView.js.map
*/