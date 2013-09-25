define(["require", "jquery", "underscore", "backbone", "backboneAnalytics", "notificationcenter", "models/stateModel", "models/authentificationModel"], function(require, $, _, Backbone, backboneAnalytics, notificationcenter, stateModel, authentificationModel) {
  var Router;
  Router = Backbone.Router.extend({
    routes: {
      "": "_showHomeHome",
      "info": "_showHomeInfo",
      "login": "_showClientLogin",
      "dashboard": "_showClientDashboard",
      "einstellungen": "_showClientConfig",
      ":alias": "_showStoreHome",
      ":alias/theke/:resourceType/:resourceId": "_showStoreSelection",
      ":alias/tablett": "_showStoreTray",
      ":alias/danke": "_showStoreCheckout",
      ":alias/info": "_showStoreInfo",
      ":alias/login": "_showStoreLogin",
      ":alias/einstellungen": "_showStoreConfig",
      ":alias/sortiment": "_showStoreAssortment",
      ":alias/dashboard": "_showStoreDashboard",
      "404": "_showPageNotFound",
      "*actions": "_defaultAction"
    },
    init: function() {
      require(["views/header/HeaderView"], function(HeaderView) {
        return new HeaderView();
      });
      notificationcenter.init();
      return Backbone.history.start({
        pushState: true,
        root: "/"
      });
    },
    navigate: function(fragment, options) {
      var parts;
      parts = fragment.split("/");
      if (parts[0] === "store") {
        parts[0] = stateModel.get("storeAlias");
        fragment = parts.join("/");
      }
      Backbone.history.navigate(fragment, options);
      return this;
    },
    _showHomeHome: function() {
      stateModel.set({
        currentRoute: "home.home"
      });
      return this._loadMainView("views/home/home/MainView");
    },
    _showHomeInfo: function() {
      stateModel.set({
        currentRoute: "home.info"
      });
      return this._loadMainView("views/home/info/MainView");
    },
    _showClientLogin: function() {
      if (!this._isLoggedIn()) {
        stateModel.set({
          currentRoute: "client.login"
        });
        return this._loadMainView("views/client/login/MainView");
      } else {
        return this.navigate("dashboard", {
          trigger: true,
          replace: true
        });
      }
    },
    _showClientDashboard: function() {
      if (this._isLoggedIn()) {
        stateModel.set({
          currentRoute: "client.dashboard"
        });
        return this._loadMainView("views/client/dashboard/MainView");
      }
    },
    _showClientConfig: function() {
      if (this._isLoggedIn()) {
        stateModel.set({
          currentRoute: "client.config"
        });
        return this._loadMainView("views/client/config/MainView");
      }
    },
    _showStoreHome: function(alias) {
      stateModel.set({
        currentRoute: "store.home",
        storeAlias: alias
      });
      if (this._isValidStoreModel()) {
        return this._loadMainView("views/store/home/MainView");
      }
    },
    _showStoreSelection: function(alias, resourceType, resourceId) {
      var params;
      stateModel.set({
        currentRoute: "store.selection",
        storeAlias: alias
      });
      params = {
        selectionRessourceType: resourceType,
        selectionRessourceId: resourceId
      };
      if (this._isValidStoreModel()) {
        return this._loadMainView("views/store/selection/MainView", params);
      }
    },
    _showStoreTray: function(alias) {
      stateModel.set({
        currentRoute: "store.tray",
        storeAlias: alias
      });
      if (this._isValidStoreModel()) {
        return this._loadMainView("views/store/tray/MainView");
      }
    },
    _showStoreCheckout: function(alias) {
      stateModel.set({
        currentRoute: "store.checkout",
        storeAlias: alias
      });
      if (this._isValidStoreModel()) {
        return this._loadMainView("views/store/checkout/MainView");
      }
    },
    _showStoreConfig: function(alias) {
      if (this._isLoggedIn()) {
        stateModel.set({
          currentRoute: "store.config",
          storeAlias: alias
        });
        if (this._isValidStoreModel()) {
          return this._loadMainView("views/store/config/MainView");
        }
      }
    },
    _showStoreAssortment: function(alias) {
      if (this._isLoggedIn()) {
        stateModel.set({
          currentRoute: "store.assortment",
          storeAlias: alias
        });
        if (this._isValidStoreModel()) {
          return this._loadMainView("views/store/assortment/MainView");
        }
      }
    },
    _showStoreDashboard: function(alias) {
      if (this._isLoggedIn()) {
        stateModel.set({
          currentRoute: "store.dashboard",
          storeAlias: alias
        });
        if (this._isValidStoreModel()) {
          return this._loadMainView("views/store/dashboard/MainView");
        }
      }
    },
    _showStoreInfo: function(alias) {
      stateModel.set({
        currentRoute: "store.info",
        storeAlias: alias
      });
      if (this._isValidStoreModel()) {
        return this._loadMainView("views/store/info/MainView");
      }
    },
    _showStoreLogin: function(alias) {
      return this.navigate("login", {
        replace: true,
        trigger: true
      });
    },
    _showPageNotFound: function() {
      stateModel.set({
        currentRoute: "home.404"
      });
      return this._loadMainView("views/home/404/MainView");
    },
    _loadMainView: function(pathToMainView, params) {
      var self;
      self = this;
      return require([pathToMainView], function(MainView) {
        params = params || {};
        if (self._pageView) {
          params.currentPageView = self._pageView;
        }
        return self._pageView = new MainView(params);
      });
    },
    _defaultAction: function() {
      var fragment;
      fragment = Backbone.history.fragment;
      if (fragment.match(/.*\/$/)) {
        fragment = fragment.replace(/\/$/, "");
        return this.navigate(fragment, {
          trigger: true,
          replace: true
        });
      } else {
        return this.navigate("404", {
          trigger: true,
          replace: true
        });
      }
    },
    _isLoggedIn: function() {
      if (authentificationModel.isLoggedIn()) {
        return true;
      } else {
        this.navigate("login", {
          trigger: true,
          replace: true
        });
        return false;
      }
    },
    _isValidStoreModel: function() {
      if (stateModel.doesStoreExist()) {
        return true;
      } else {
        this.navigate("404", {
          trigger: true,
          replace: true
        });
        return false;
      }
    }
  });
  return new Router();
});
