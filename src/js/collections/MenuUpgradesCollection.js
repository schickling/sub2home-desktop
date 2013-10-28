define(["underscore", "backbone", "models/MenuUpgradeModel"], function(_, Backbone, MenuUpgradeModel) {
  var MenuUpgradesCollection;
  return MenuUpgradesCollection = Backbone.Collection.extend({
    model: MenuUpgradeModel,
    url: "stores/storeAlias/menuupgrades"
  });
});

/*
//@ sourceMappingURL=MenuUpgradesCollection.js.map
*/