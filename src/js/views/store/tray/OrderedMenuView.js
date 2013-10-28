define(["jquery", "underscore", "backbone", "views/store/tray/OrderedArticleMenuView", "text!templates/store/tray/OrderedMenuTemplate.html"], function($, _, Backbone, OrderedArticleMenuView, OrderedMenuTemplate) {
  var OrderedMenuView;
  return OrderedMenuView = Backbone.View.extend({
    template: _.template(OrderedMenuTemplate),
    $pricetag: null,
    $controls: null,
    $titleContainer: null,
    events: {
      mouseenter: "_showControls",
      mouseleave: "_hideControls"
    },
    initialize: function() {
      this._render();
      return this._cacheDom();
    },
    _render: function() {
      var json;
      this.$el.addClass("orderedMenu");
      json = {
        title: this.model.getMenuTitle(),
        total: this.model.get("total") / this.model.get("amount"),
        amount: this.model.get("amount")
      };
      this.$el.html(this.template(json));
      return this._renderArticles();
    },
    _renderArticles: function() {
      var orderedArticlesCollection;
      orderedArticlesCollection = this.model.get("orderedArticlesCollection");
      return _.each(orderedArticlesCollection.models, (function(orderedArticleModel) {
        return this._renderArticle(orderedArticleModel.get("articleModel"));
      }), this);
    },
    _renderArticle: function(articleModel) {
      var orderedArticleMenuView;
      orderedArticleMenuView = new OrderedArticleMenuView({
        model: articleModel
      });
      return this.$(".menuItems").append(orderedArticleMenuView.el);
    },
    _cacheDom: function() {
      this.$pricetag = this.$(".pricetag");
      this.$titleContainer = this.$(".titleContainer");
      return this.$controls = this.$(".controls");
    },
    _showControls: function() {
      this.$pricetag.stop().animate({
        right: 110
      }, 200);
      this.$titleContainer.stop().animate({
        marginRight: 210
      }, 200);
      return this.$controls.delay(100).stop().fadeIn(100);
    },
    _hideControls: function() {
      this.$pricetag.stop().animate({
        right: 0
      }, 200);
      this.$titleContainer.stop().animate({
        marginRight: 115
      }, 200);
      return this.$controls.stop().fadeOut(100);
    }
  });
});

/*
//@ sourceMappingURL=OrderedMenuView.js.map
*/