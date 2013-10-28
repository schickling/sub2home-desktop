define(["jquery", "underscore", "backbone", "services/notificationcenter"], function($, _, Backbone, notificationcenter, ArticleTemplate) {
  var ItemBaseView;
  return ItemBaseView = Backbone.View.extend({
    className: "",
    events: {
      "click .bEye": "_toggleIsActive",
      "focusout input": "_updateCustomPrice",
      "click .bReset": "_resetCustomPrice"
    },
    template: null,
    initialize: function() {
      this._render();
      return this.model.on("renderAgain", this._render, this);
    },
    _render: function() {
      var json;
      json = {
        title: this.model.get("title"),
        price: this.model.get("customPrice"),
        info: this.model.get("info"),
        isActive: this.model.get("isActive"),
        buyed: this.model.get("buyed"),
        image: this.model.get("smallImage"),
        priceDiffers: this.model.get("customPrice") !== this.model.get("price")
      };
      this.$el.html(this.template(json));
      return this.$el.toggleClass("inactive", !this.model.get("isActive"));
    },
    _toggleIsActive: function() {
      var $el, $eye, isActive, itemModel;
      itemModel = this.model;
      $eye = this.$(".bEye");
      $el = this.$el;
      isActive = !this.model.get("isActive");
      itemModel.set("isActive", isActive);
      return itemModel.save({}, {
        success: function() {
          $eye.toggleClass("open", isActive);
          $el.toggleClass("inactive", !isActive);
          if (isActive) {
            return notificationcenter.notify("views.store.assortment.items.success.isActive");
          } else {
            return notificationcenter.notify("views.store.assortment.items.success.isNotActive");
          }
        },
        error: function() {
          notificationcenter.notify("views.store.assortment.items.error");
          return itemModel.set("isActive", !isActive);
        }
      });
    },
    _updateCustomPrice: function() {
      var $input, customPrice, self;
      $input = this.$(".pricetag input");
      customPrice = parseFloat($input.val());
      self = this;
      this.model.set("customPrice", customPrice);
      return this.model.save({}, {
        success: function() {
          notificationcenter.notify("Preis geaendert");
          return self._render();
        },
        error: function() {
          return notificationcenter.notify("views.store.assortment.items.error");
        }
      });
    },
    _resetCustomPrice: function() {
      var $input;
      $input = this.$(".pricetag input");
      $input.val(this.model.get("price"));
      return this._updateCustomPrice();
    }
  });
});

/*
//@ sourceMappingURL=ItemBaseView.js.map
*/