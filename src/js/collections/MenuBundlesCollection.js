define(["underscore", "backbone", "models/MenuBundleModel"], function(_, Backbone, MenuBundleModel) {
  var MenuBundlesCollection;
  return MenuBundlesCollection = Backbone.Collection.extend({
    model: MenuBundleModel,
    url: function() {
      return "stores/storeAlias/menubundles";
    }
  });
});
