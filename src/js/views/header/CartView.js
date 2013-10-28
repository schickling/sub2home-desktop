define(["jquery", "underscore", "backbone", "services/router", "services/notificationcenter", "models/stateModel", "models/cartModel", "text!templates/header/CartTemplate.html"], function($, _, Backbone, router, notificationcenter, stateModel, cartModel, CartTemplate) {
  var CartView;
  return CartView = Backbone.View.extend({
    template: _.template(CartTemplate),
    events: {
      click: "_goToTray"
    },
    initialize: function() {
      this.model = cartModel;
      this._render();
      this._enableTooltips();
      this._listenToNewDeliveryArea();
      return this.model.on("change", this._render, this);
    },
    _listenToNewDeliveryArea: function() {
      var storeModel;
      storeModel = stateModel.get("storeModel");
      return storeModel.on("change", this._render, this);
    },
    _enableTooltips: function() {
      return notificationcenter.tooltip(this.$el);
    },
    _render: function() {
      var amount, json, selectedDeliveryAreaModel, storeModel, that;
      storeModel = stateModel.get("storeModel");
      selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel();
      amount = this.model.getNumberOfOrderedItems();
      json = {
        amount: amount,
        minimum: selectedDeliveryAreaModel.get("minimumValue"),
        total: this.model.getTotal()
      };
      this.$el.html(this.template(json));
      this.$el.toggleClass("filled", amount > 0);
      if (amount > 0) {
        this.$el.addClass("justFilled");
        that = this;
        return setTimeout((function() {
          return that.$el.removeClass("justFilled");
        }), 800);
      }
    },
    _goToTray: function() {
      if (this.model.getNumberOfOrderedItems() > 0) {
        return router.navigate("store/tablett", true);
      } else {
        return notificationcenter.notify("views.header.cart.empty");
      }
    }
  });
});

/*
//@ sourceMappingURL=CartView.js.map
*/