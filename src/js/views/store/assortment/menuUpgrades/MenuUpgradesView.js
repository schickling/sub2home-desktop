define(["jquery", "underscore", "backbone", "collections/MenuUpgradesCollection", "views/store/assortment/SectionBaseView", "views/store/assortment/menuUpgrades/MenuUpgradeView", "views/store/assortment/menuUpgrades/ControlView"], function($, _, Backbone, MenuUpgradesCollection, SectionBaseView, MenuUpgradeView, ControlView) {
  var MenuUpgradesView;
  return MenuUpgradesView = SectionBaseView.extend({
    controlViewClass: ControlView,
    collectionClass: MenuUpgradesCollection,
    className: "menuUpgrades",
    _fetchCollection: function() {
      var self;
      self = this;
      return this.collection.fetch({
        success: function() {
          return self._renderContent();
        }
      });
    },
    _renderContent: function() {
      return _.each(this.collection.models, (function(menuUpgradeModel) {
        return this._renderMenuUpgrade(menuUpgradeModel);
      }), this);
    },
    _renderMenuUpgrade: function(menuUpgradeModel) {
      var menuUpgradeView;
      menuUpgradeView = new MenuUpgradeView({
        model: menuUpgradeModel
      });
      return this.$content.append(menuUpgradeView.el);
    }
  });
});

/*
//@ sourceMappingURL=MenuUpgradesView.js.map
*/