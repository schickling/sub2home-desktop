define(["jquery", "underscore", "backbone", "services/router", "services/notificationcenter", "models/stateModel", "models/clientModel", "models/authentificationModel", "text!templates/header/ClientTemplate.html"], function($, _, Backbone, router, notificationcenter, stateModel, clientModel, authentificationModel, ClientTemplate) {
  var ClientView;
  $.objectOfArray = function(a) {
    var c, x;
    c = $();
    for (x in a) {
      c = c.add(a[x]);
    }
    return c;
  };
  return ClientView = Backbone.View.extend({
    $buttonLogout: null,
    $buttonClientDashboard: null,
    $buttonClientConfig: null,
    $buttonStoreDashboard: null,
    $buttonStoreAssortment: null,
    $buttonStoreConfig: null,
    $allButtons: null,
    $currentIcon: null,
    $title: null,
    animationTime: 150,
    events: {
      "click #bSignout": "_logout",
      "click #bStoreConfig": "_navigateToStoreConfig",
      "click #bClientConfig": "_navigateToClientConfig",
      "click #bStoreAssortment": "_navigateToStoreAssortment",
      "click #bStoreDashboard": "_navigateToStoreDashboard",
      "click #bClientDashboard": "_navigateToClientDashboard",
      "mouseenter #bSignout": "_tooltipLogout",
      "mouseenter #bStoreConfig": "_tooltipForStoreConfig",
      "mouseenter #bClientConfig": "_tooltipForClientConfig",
      "mouseenter #bStoreAssortment": "_tooltipForStoreAssortment",
      "mouseenter #bStoreDashboard": "_tooltipForStoreDashboard",
      "mouseenter #bClientDashboard": "_tooltipForClientDashboard",
      "mouseleave .iBtn": "_dismissTooltip"
    },
    initialize: function() {
      this._render();
      this._enableTooltips();
      return this._listenToCurrentRoute();
    },
    _render: function() {
      this.$el.html(ClientTemplate);
      this._cacheDom();
      return this._selectViewFromCurrentRoute();
    },
    _enableTooltips: function() {},
    _cacheDom: function() {
      this.$buttonLogout = this.$("#bSignout");
      this.$buttonClientDashboard = this.$("#bClientDashboard");
      this.$buttonClientConfig = this.$("#bClientConfig");
      this.$buttonStoreDashboard = this.$("#bStoreDashboard");
      this.$buttonStoreAssortment = this.$("#bStoreAssortment");
      this.$buttonStoreConfig = this.$("#bStoreConfig");
      this.$allButtons = this.$("#clientAreaNavigation .iBtn").not(this.$buttonLogout);
      this.$currentIcon = this.$("#currentIcon");
      return this.$title = this.$("#currentInfo span");
    },
    _listenToCurrentRoute: function() {
      return stateModel.on("change:currentRoute", this._selectViewFromCurrentRoute, this);
    },
    _selectViewFromCurrentRoute: function() {
      var currentRoute;
      currentRoute = stateModel.get("currentRoute");
      switch (currentRoute) {
        case "client.dashboard":
          return this._showClientDashboard();
        case "client.config":
          return this._showClientConfig();
        case "store.dashboard":
          return this._showStoreDashboard();
        case "store.assortment":
          return this._showStoreAssortment();
        case "store.config":
          return this._showStoreConfig();
        default:
          if (stateModel.doesStoreExist()) {
            return this._showStoreGlobal();
          }
      }
    },
    _showClientDashboard: function() {
      var $neededButtons, $unneededButtons, title;
      $neededButtons = this.$buttonClientConfig;
      $unneededButtons = this.$allButtons.not($neededButtons);
      title = clientModel.getName() + "'s sub2home";
      this.$allButtons.removeClass("active");
      this.$title.text(title);
      this.$currentIcon.removeClass("storeIcon");
      this.$currentIcon.addClass("clientIcon");
      $unneededButtons.fadeOut(this.animationTime);
      return $neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
    },
    _showClientConfig: function() {
      var $neededButtons, $unneededButtons, title;
      $neededButtons = this.$buttonClientDashboard;
      $unneededButtons = this.$allButtons.not($neededButtons);
      title = clientModel.getName() + "'s sub2home";
      this.$allButtons.removeClass("active");
      this.$title.text(title);
      this.$currentIcon.removeClass("storeIcon");
      this.$currentIcon.addClass("clientIcon");
      $unneededButtons.fadeOut(this.animationTime);
      return $neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
    },
    _showStoreDashboard: function() {
      var $neededButtons, $unneededButtons, storeModel, title;
      $neededButtons = $.objectOfArray([this.$buttonClientDashboard, this.$buttonStoreConfig, this.$buttonStoreAssortment, this.$buttonStoreDashboard]);
      $unneededButtons = this.$allButtons.not($neededButtons);
      storeModel = stateModel.get("storeModel");
      title = "Dashboard: " + storeModel.get("title");
      this.$allButtons.removeClass("active");
      this.$buttonStoreDashboard.addClass("active");
      this.$title.text(title);
      this.$currentIcon.removeClass("clientIcon");
      this.$currentIcon.addClass("storeIcon");
      $unneededButtons.fadeOut(this.animationTime);
      return $neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
    },
    _showStoreAssortment: function() {
      var $neededButtons, $unneededButtons, storeModel, title;
      $neededButtons = $.objectOfArray([this.$buttonClientDashboard, this.$buttonStoreConfig, this.$buttonStoreAssortment, this.$buttonStoreDashboard]);
      $unneededButtons = this.$allButtons.not($neededButtons);
      storeModel = stateModel.get("storeModel");
      title = "Sortiment: " + storeModel.get("title");
      this.$allButtons.removeClass("active");
      this.$buttonStoreAssortment.addClass("active");
      this.$title.text(title);
      this.$currentIcon.removeClass("clientIcon");
      this.$currentIcon.addClass("storeIcon");
      $unneededButtons.fadeOut(this.animationTime);
      return $neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
    },
    _showStoreConfig: function() {
      var $neededButtons, $unneededButtons, storeModel, title;
      $neededButtons = $.objectOfArray([this.$buttonClientDashboard, this.$buttonStoreConfig, this.$buttonStoreAssortment, this.$buttonStoreDashboard]);
      $unneededButtons = this.$allButtons.not($neededButtons);
      storeModel = stateModel.get("storeModel");
      title = "Einstellungen: " + storeModel.get("title");
      this.$allButtons.removeClass("active");
      this.$buttonStoreConfig.addClass("active");
      this.$title.text(title);
      this.$currentIcon.removeClass("clientIcon");
      this.$currentIcon.addClass("storeIcon");
      $unneededButtons.fadeOut(this.animationTime);
      return $neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
    },
    _showStoreGlobal: function() {
      var $neededButtons, $unneededButtons, storeModel, title;
      $neededButtons = $.objectOfArray([this.$buttonClientDashboard, this.$buttonStoreConfig, this.$buttonStoreAssortment, this.$buttonStoreDashboard]);
      $unneededButtons = this.$allButtons.not($neededButtons);
      storeModel = stateModel.get("storeModel");
      title = storeModel.get("title");
      this.$allButtons.removeClass("active");
      this.$title.text(title);
      this.$currentIcon.removeClass("clientIcon");
      this.$currentIcon.addClass("storeIcon");
      $unneededButtons.fadeOut(this.animationTime);
      return $neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
    },
    _logout: function() {
      var logoutSucceded;
      logoutSucceded = authentificationModel.logout();
      if (logoutSucceded && stateModel.currentRouteIsClientRelated()) {
        return router.navigate("/", true);
      }
    },
    _navigateToStoreConfig: function() {
      return router.navigate("store/einstellungen", true);
    },
    _navigateToStoreAssortment: function() {
      return router.navigate("store/sortiment", true);
    },
    _navigateToStoreDashboard: function() {
      return router.navigate("store/dashboard", true);
    },
    _navigateToClientDashboard: function() {
      return router.navigate("dashboard", true);
    },
    _navigateToClientConfig: function() {
      return router.navigate("einstellungen", true);
    },
    remove: function() {
      return stateModel.off("change:currentRoute", this._selectViewFromCurrentRoute, this);
    },
    _tooltipLogout: function() {
      var offset;
      offset = this.$buttonLogout.offset();
      return notificationcenter.tooltip("views.header.logout", offset.top + 64, offset.left + 34);
    },
    _tooltipForStoreConfig: function() {
      var offset;
      offset = this.$buttonStoreConfig.offset();
      return notificationcenter.tooltip("views.header.store.config", offset.top + 64, offset.left + 24);
    },
    _tooltipForStoreAssortment: function() {
      var offset;
      offset = this.$buttonStoreAssortment.offset();
      return notificationcenter.tooltip("views.header.store.assortment", offset.top + 64, offset.left + 24);
    },
    _tooltipForStoreDashboard: function() {
      var offset;
      offset = this.$buttonStoreDashboard.offset();
      return notificationcenter.tooltip("views.header.store.dashboard", offset.top + 64, offset.left + 23);
    },
    _tooltipForClientDashboard: function() {
      var offset;
      offset = this.$buttonClientDashboard.offset();
      return notificationcenter.tooltip("views.header.client.dashboard", offset.top + 64, offset.left + 34);
    },
    _tooltipForClientConfig: function() {
      var offset;
      offset = this.$buttonClientConfig.offset();
      return notificationcenter.tooltip("views.header.client.config", offset.top + 64, offset.left + 34);
    },
    _dismissTooltip: function() {
      return notificationcenter.hideTooltip();
    }
  });
});

/*
//@ sourceMappingURL=ClientView.js.map
*/