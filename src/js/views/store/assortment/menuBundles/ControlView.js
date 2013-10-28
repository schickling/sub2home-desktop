define(["jquery", "underscore", "backbone", "views/store/assortment/ControlBaseView"], function($, _, Backbone, ControlBaseView) {
  var ControlView;
  return ControlView = ControlBaseView.extend({
    events: {
      "click .bReset": "_resetAllPrices",
      "click .showAll": "_showAllMenus"
    },
    _countItems: function() {
      return this.numberOfItems = this.collection.length;
    },
    _resetAllPrices: function() {
      _.each(this.collection.models, (function(menuBundleModel) {
        if (menuBundleModel.get("price") !== menuBundleModel.get("customPrice")) {
          return this._updateModel(menuBundleModel, {
            customPrice: menuBundleModel.get("price")
          });
        }
      }), this);
      return this._updateLoadBar();
    },
    _showAllMenus: function() {
      _.each(this.collection.models, (function(menuBundleModel) {
        if (!menuBundleModel.get("isActive")) {
          return this._updateModel(menuBundleModel, {
            isActive: true
          });
        }
      }), this);
      return this._updateLoadBar();
    }
  });
});

/*
//@ sourceMappingURL=ControlView.js.map
*/