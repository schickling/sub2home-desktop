define(["jquery", "underscore", "backbone", "services/router", "models/stateModel", "text!templates/store/home/ArticleDetailsTemplate.html"], function($, _, Backbone, router, stateModel, ArticleDetailsTemplate) {
  var ArticleDetailsView;
  return ArticleDetailsView = Backbone.View.extend({
    className: "detailsArticle",
    selectedItemModel: null,
    animationTime: 200,
    hideTimer: 0,
    template: _.template(ArticleDetailsTemplate),
    events: {
      "click .bFood, img": "_goToSelection",
      "click .footlongOption": "_makeFootlong",
      "click .uncheckFootlong": "_make6Inch",
      "mouseleave": "_hide",
      "mouseenter": "_stopHiding"
    },
    initialize: function() {
      this.selectedItemModel = this.model;
      return this._render();
    },
    _render: function() {
      var attachedItemsCollection, footlongItemModel, json;
      attachedItemsCollection = this.model.get("attachedItemsCollection");
      footlongItemModel = attachedItemsCollection.first();
      json = {
        title: this.model.get("title"),
        image: this.model.get("largeImage"),
        footlongImage: footlongItemModel.get("largeImage"),
        description: this.model.get("description"),
        price: this.model.get("price")
      };
      return this.$el.html(this.template(json));
    },
    _goToSelection: function() {
      return router.navigate("store/theke/artikel/" + this.selectedItemModel.get("id"), true);
    },
    _makeFootlong: function() {
      var $6inch, $footlong, $footlongOption, $images, $pricetag, $uncheckFootlong, attachedItemsCollection, footlongItemModel;
      attachedItemsCollection = this.model.get("attachedItemsCollection");
      footlongItemModel = attachedItemsCollection.first();
      $uncheckFootlong = this.$(".uncheckFootlong");
      $footlongOption = this.$(".footlongOption");
      $images = this.$("img");
      $6inch = $images.eq(0);
      $footlong = $images.eq(1);
      $pricetag = this.$(".pricetag");
      $footlong.fadeIn(this.animationTime);
      $6inch.delay(this.animationTime / 2).fadeOut(this.animationTime / 2);
      $uncheckFootlong.fadeIn(this.animationTime);
      $footlongOption.fadeOut(this.animationTime);
      $pricetag.find("span").text(footlongItemModel.get("price") + " €");
      $pricetag.animate({
        left: 393
      }, this.animationTime);
      return this.selectedItemModel = footlongItemModel;
    },
    _make6Inch: function() {
      var $6inch, $footlong, $footlongOption, $images, $pricetag, $uncheckFootlong;
      $uncheckFootlong = this.$(".uncheckFootlong");
      $footlongOption = this.$(".footlongOption");
      $images = this.$("img");
      $6inch = $images.eq(0);
      $footlong = $images.eq(1);
      $pricetag = this.$(".pricetag");
      $footlong.fadeOut(this.animationTime);
      $6inch.fadeIn(this.animationTime / 2);
      $uncheckFootlong.fadeOut(this.animationTime);
      $footlongOption.fadeIn(this.animationTime);
      $pricetag.find("span").text(this.model.get("price") + " €");
      $pricetag.animate({
        left: 193
      }, this.animationTime);
      return this.selectedItemModel = this.model;
    },
    _hide: function() {
      var self;
      self = this;
      return this.hideTimer = setTimeout(function() {
        return self.$el.fadeOut(150, function() {
          return self.remove();
        });
      }, 200);
    },
    _stopHiding: function() {
      return clearTimeout(this.hideTimer);
    }
  });
});

/*
//@ sourceMappingURL=ArticleDetailsView.js.map
*/