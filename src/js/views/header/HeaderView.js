define(["jquery", "jqueryEasing", "underscore", "backbone", "services/router", "models/authentificationModel", "models/stateModel", "views/header/StoreView", "text!templates/header/HeaderTemplate.html", "text!templates/header/RoleSwitchTemplate.html"], function($, jqueryEasing, _, Backbone, router, authentificationModel, stateModel, StoreView, HeaderTemplate, RoleSwitchTemplate) {
  var HeaderView;
  return HeaderView = Backbone.View.extend({
    el: $("#header"),
    events: {
      "click #logo": "_goToHomeHome",
      "click #roleSwitch": "_switchContentView",
      "click #toTheInfo": "_goToInfo",
      "click #feedbackFlag": "_startUservoice"
    },
    initialize: function() {
      this._render();
      this._listenToHeaderState();
      this._listenToInfo();
      stateModel.on("change:storeModel", this._renderStoreView, this);
      return authentificationModel.on("change:isLoggedIn", this._render, this);
    },
    _render: function() {
      var isClientHeaderActive, isLoggedIn, isStoreSelected;
      this.$el.html(HeaderTemplate);
      isLoggedIn = authentificationModel.isLoggedIn();
      isStoreSelected = stateModel.get("storeModel") !== null;
      isClientHeaderActive = stateModel.get("isClientHeaderActive");
      if (isLoggedIn) {
        this._renderRoleSwitch();
        this._renderClientView();
      }
      if (isStoreSelected) {
        this._renderStoreView();
      }
      if (isLoggedIn && isClientHeaderActive) {
        this._showClientView();
        return this.$("#headerCustomerContent").hide();
      } else if (isStoreSelected) {
        this._showStoreView();
        this.$("#headerClientContent").hide();
        return this._toggleInfoClose();
      }
    },
    _listenToInfo: function() {
      return stateModel.on("change:currentRoute", this._toggleInfoClose, this);
    },
    _toggleInfoClose: function() {
      return this.$("#toTheInfo").toggleClass("closeTheInfo", this._isOnInfoPage());
    },
    _listenToHeaderState: function() {
      return stateModel.on("change:isClientHeaderActive", (function() {
        if (stateModel.get("isClientHeaderActive")) {
          return this._showClientView();
        } else {
          return this._showStoreView();
        }
      }), this);
    },
    _renderRoleSwitch: function() {
      this.$el.append(RoleSwitchTemplate);
      return this.$el.addClass("isLoggedIn");
    },
    _renderStoreView: function() {
      return new StoreView({
        model: stateModel.get("storeModel"),
        el: this.$("#headerCustomerContent")
      });
    },
    _renderClientView: function() {
      var self;
      self = this;
      return require(["views/header/ClientView"], function(ClientView) {
        return new ClientView({
          el: self.$("#headerClientContent")
        });
      });
    },
    _showClientView: function() {
      var $handle, $headerClientContent, $headerCustomerContent;
      $handle = this.$("#handle");
      $headerCustomerContent = this.$("#headerCustomerContent");
      $headerClientContent = this.$("#headerClientContent");
      $headerCustomerContent.fadeOut(100);
      $headerClientContent.fadeIn(150);
      return $handle.animate({
        top: 27
      }, 100, "easeInExpo", function() {
        return $handle.removeClass("iUser").addClass("iSettings");
      });
    },
    _showStoreView: function() {
      var $handle, $headerClientContent, $headerCustomerContent;
      $handle = this.$("#handle");
      $headerCustomerContent = this.$("#headerCustomerContent");
      $headerClientContent = this.$("#headerClientContent");
      $headerClientContent.fadeOut(100);
      $headerCustomerContent.fadeIn(150);
      return $handle.animate({
        top: 2
      }, 100, "easeInExpo", function() {
        return $handle.removeClass("iSettings").addClass("iUser");
      });
    },
    _goToHomeHome: function() {
      return router.navigate("/", true);
    },
    _switchContentView: function() {
      if (stateModel.get("isClientHeaderActive")) {
        stateModel.set("isClientHeaderActive", false);
        if (stateModel.currentRouteIsClientRelated()) {
          if (stateModel.currentRouteIsStoreRelated()) {
            return router.navigate("store", true);
          } else {
            return router.navigate("/", true);
          }
        }
      } else {
        stateModel.set("isClientHeaderActive", true);
        if (!stateModel.currentRouteIsClientRelated()) {
          if (stateModel.currentRouteIsStoreRelated()) {
            return router.navigate("store/dashboard", true);
          } else {
            return router.navigate("dashboard", true);
          }
        }
      }
    },
    _isOnInfoPage: function() {
      return !!stateModel.get("currentRoute").match(/(store.)?info/);
    },
    _goToInfo: function(e) {
      if (this._isOnInfoPage()) {
        return window.history.back();
      } else {
        if (stateModel.currentRouteIsStoreRelated()) {
          return router.navigate("store/info", true);
        } else {
          return router.navigate("info", true);
        }
      }
    },
    _startUservoice: function() {
      var UserVoice;
      UserVoice = window.UserVoice || [];
      return UserVoice.push([
        "showLightbox", "classic_widget", {
          mode: "support",
          primary_color: "#cc6d00",
          link_color: "#007dbf"
        }
      ]);
    }
  });
});

/*
//@ sourceMappingURL=HeaderView.js.map
*/