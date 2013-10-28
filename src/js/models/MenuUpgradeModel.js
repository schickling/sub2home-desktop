define(["underscore", "backbone", "models/MenuModel"], function(_, Backbone, MenuModel) {
  var MenuUpgradeModel;
  return MenuUpgradeModel = MenuModel.extend({
    defaults: {
      menuComponentBlocksCollection: null,
      title: "",
      description: "",
      price: "",
      isActive: false,
      customPrice: 0,
      buyed: 0
    },
    urlRoot: "stores/storeAlias/menuupgrades"
  });
});

/*
//@ sourceMappingURL=MenuUpgradeModel.js.map
*/