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
      _.each(this.collection.models, (function(menuUpgradeModel) {
        if (menuUpgradeModel.get("price") !== menuUpgradeModel.get("customPrice")) {
          return this._updateModel(menuUpgradeModel, {
            customPrice: menuUpgradeModel.get("price")
          });
        }
      }), this);
      return this._updateLoadBar();
    },
    _showAllMenus: function() {
      _.each(this.collection.models, (function(menuUpgradeModel) {
        if (!menuUpgradeModel.get("isActive")) {
          return this._updateModel(menuUpgradeModel, {
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