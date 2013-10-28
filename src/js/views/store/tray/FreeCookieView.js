define(["jquery", "underscore", "backbone", "services/notificationcenter", "models/cartModel", "text!templates/store/tray/FreeCookieTemplate.html"], function($, _, Backbone, notificationcenter, cartModel, FreeCookieTemplate) {
  var FreeCookieView;
  return FreeCookieView = Backbone.View.extend({
    template: _.template(FreeCookieTemplate),
    events: {
      "focusin input": "_extendInput",
      "focusout input": "_checkCollapseInput"
    },
    initialize: function() {
      this._render();
      return this._cacheDom();
    },
    _render: function() {
      var couponCode, json, orderModel;
      orderModel = cartModel.get("orderModel");
      couponCode = orderModel.get("couponCode");
      json = {
        code: couponCode
      };
      this.$el.html(this.template(json));
      return this._markHasCode();
    },
    _markHasCode: function() {
      var orderModel;
      orderModel = cartModel.get("orderModel");
      return this.$el.toggleClass("hasCode", orderModel.get("couponCode") !== "");
    },
    _markIsValid: function() {
      return this.$el.toggleClass("valid", cartModel.isCouponCodeValid());
    },
    _cacheDom: function() {
      this.$input = this.$("input");
      return this.$label = this.$("label");
    },
    _extendInput: function() {
      this.$label.fadeOut(70);
      return this.$input.delay(70).animate({
        width: 390
      }, 150);
    },
    _checkCollapseInput: function() {
      this._saveCode();
      this._markHasCode();
      this._markIsValid();
      if (!this.$input.val()) {
        return this._collapseInput();
      } else {
        return this._checkCode();
      }
    },
    _collapseInput: function() {
      this.$label.delay(150).fadeIn(70);
      return this.$input.animate({
        width: 86
      }, 150);
    },
    _checkCode: function() {
      if (cartModel.isCouponCodeValid()) {
        return notificationcenter.notify("views.store.tray.coupon.valid");
      } else {
        return notificationcenter.notify("views.store.tray.coupon.invalid");
      }
    },
    _saveCode: function() {
      var couponCode, orderModel;
      orderModel = cartModel.get("orderModel");
      couponCode = this.$input.val();
      return orderModel.set("couponCode", couponCode);
    }
  });
});

/*
//@ sourceMappingURL=FreeCookieView.js.map
*/