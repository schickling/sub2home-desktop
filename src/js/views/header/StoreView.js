define(["jquery", "underscore", "backbone", "services/router", "services/notificationcenter", "models/stateModel", "views/header/CartView", "text!templates/header/StoreTemplate.html"], function($, _, Backbone, router, notificationcenter, stateModel, CartView, StoreTemplate) {
  var StoreView;
  return StoreView = Backbone.View.extend({
    template: _.template(StoreTemplate),
    events: {
      "click #back": "_backToStoreHome"
    },
    $back: null,
    initialize: function() {
      this._render();
      return this._listenToCurrentRoute();
    },
    _render: function() {
      var json;
      json = {
        title: this.model.get("title"),
        isBackButtonHidden: this._currentRouteIsStoreHome()
      };
      this.$el.html(this.template(json));
      this._cacheDom();
      return this._renderCart();
    },
    _cacheDom: function() {
      return this.$back = this.$("#back");
    },
    _renderCart: function() {
      var cartView;
      return cartView = new CartView({
        el: this.$("#trayPreview")
      });
    },
    _listenToCurrentRoute: function() {
      return this.listenTo(stateModel, "change:currentRoute", this._checkBackButton);
    },
    _currentRouteIsStoreHome: function() {
      var currentRoute;
      currentRoute = stateModel.get("currentRoute");
      return currentRoute === "store.home";
    },
    _checkBackButton: function() {
      if (this._currentRouteIsStoreHome()) {
        return this._hideBackButton();
      } else {
        return this._showBackButton();
      }
    },
    _hideBackButton: function() {
      return this.$back.fadeOut(300);
    },
    _showBackButton: function() {
      return this.$back.fadeIn(300);
    },
    _backToStoreHome: function() {
      return router.navigate("store", true);
    }
  });
});

/*
//@ sourceMappingURL=StoreView.js.map
*/