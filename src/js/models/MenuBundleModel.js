define(["underscore", "backbone", "models/MenuModel"], function(_, Backbone, MenuModel) {
  var MenuBundleModel;
  return MenuBundleModel = MenuModel.extend({
    defaults: {
      menuComponentBlocksCollection: null,
      title: "",
      description: "",
      smallImage: "",
      largeImage: "",
      price: "",
      isActive: false,
      customPrice: 0,
      buyed: 0
    },
    urlRoot: "stores/storeAlias/menubundles"
  });
});

/*
//@ sourceMappingURL=MenuBundleModel.js.map
*/