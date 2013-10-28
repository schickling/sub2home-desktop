define(["jquery", "jqueryColor", "underscore", "backbone", "services/router", "services/notificationcenter", "models/cartModel", "text!templates/store/tray/ControlTemplate.html"], function($, jqueryColor, _, Backbone, router, notificationcenter, cartModel, ControlTemplate) {
  var ControlView;
  return ControlView = Backbone.View.extend({
    template: _.template(ControlTemplate),
    events: {
      "click .orderNow": "_checkout",
      "click #iAGB": "_acceptAGB",
      "click #credit.hasNoCredit": "_showTip",
      "click #credit .bAdd": "_increaseTip",
      "click #credit .bRemove": "_decreaseTip"
    },
    initialize: function() {
      this._render();
      return this._listenForDataChanges();
    },
    orderIsLocked: false,
    _render: function() {
      var addressModel, isReady, json, paymentMethod;
      paymentMethod = "";
      switch (cartModel.getPaymentMethod()) {
        case "cash":
          paymentMethod = "in Bar";
          break;
        case "ec":
          paymentMethod = "mit EC Karte";
          break;
        case "paypal":
          paymentMethod = "via Paypal";
      }
      addressModel = cartModel.getCustomerAddressModel();
      isReady = addressModel.get("firstName") && addressModel.get("lastName") && addressModel.get("street");
      json = {
        isReady: isReady,
        total: cartModel.getTotal() + cartModel.getTip(),
        hasTip: cartModel.getTip() > 0,
        firstName: addressModel.get("firstName"),
        lastName: addressModel.get("lastName"),
        street: addressModel.get("street"),
        streetNumber: addressModel.get("streetNumber"),
        paymentMethod: paymentMethod,
        comment: cartModel.getComment()
      };
      this.$el.html(this.template(json));
      this.$el.toggleClass("accepted", cartModel.get("termsAccepted"));
      return this.delegateEvents();
    },
    _listenForDataChanges: function() {
      return this.listenTo(cartModel, "change", this._render);
    },
    _acceptAGB: function() {
      var $iAGB, $iCart, $notice;
      $iAGB = this.$("#iAGB");
      $iCart = this.$("#iCart");
      $notice = this.$("#acceptAGB");
      $notice.removeClass("leftHandBelow");
      $iAGB.fadeOut(100);
      return $iCart.animate({
        "margin-right": 10,
        color: $.Color("rgba(156,200,62,0.4)")
      }, 150, function() {
        return cartModel.set("termsAccepted", true);
      });
    },
    _checkout: function() {
      var orderModel, self;
      if (this.orderIsLocked) {
        return;
      }
      orderModel = cartModel.get("orderModel");
      self = this;
      if (!cartModel.isMinimumReached()) {
        notificationcenter.notify("views.store.tray.minimumNotReached");
        return;
      }
      if (!cartModel.get("termsAccepted")) {
        notificationcenter.notify("views.store.tray.termsNotAccepted");
        return;
      }
      this.orderIsLocked = true;
      return orderModel.save({}, {
        success: function() {
          self._ringBell();
          cartModel.cleanUp();
          cartModel.set("isClosed", true);
          return router.navigate("store/danke", {
            trigger: true,
            replace: true
          });
        },
        error: function() {
          notificationcenter.notify("views.store.tray.orderFailed");
          return self.orderIsLocked = false;
        }
      });
    },
    _ringBell: function() {
      var sound;
      sound = new Audio("https://d3uu6huyzvecb1.cloudfront.net/audio/bell.ogg");
      return sound.play();
    },
    _showTip: function() {
      var $credit, $notice, self;
      $credit = this.$("#credit");
      $notice = $credit.find(".notice");
      self = this;
      return $notice.fadeOut(100, function() {
        return $credit.animate({
          width: 100
        }, 300, function() {
          return self._increaseTip();
        });
      });
    },
    _hideTip: function() {
      var $credit, $notice, orderModel;
      $credit = this.$("#credit");
      $notice = $credit.find(".notice");
      orderModel = cartModel.get("orderModel");
      $credit.addClass("hasNoTip");
      return $credit.animate({
        width: 45
      }, 300, function() {
        return $notice.fadeIn(100, function() {
          return orderModel.decreaseTip();
        });
      });
    },
    _increaseTip: function() {
      var orderModel;
      orderModel = cartModel.get("orderModel");
      return orderModel.increaseTip();
    },
    _decreaseTip: function() {
      var orderModel;
      orderModel = cartModel.get("orderModel");
      if (orderModel.get("tip") <= 0.50) {
        return this._hideTip();
      } else {
        return orderModel.decreaseTip();
      }
    },
    destroy: function() {
      return this.stopListening();
    }
  });
});

/*
//@ sourceMappingURL=ControlView.js.map
*/