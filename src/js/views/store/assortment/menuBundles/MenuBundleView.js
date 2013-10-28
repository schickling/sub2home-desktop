define(["jquery", "underscore", "backbone", "views/store/assortment/ItemBaseView", "text!templates/store/assortment/menuBundles/MenuBundleTemplate.html"], function($, _, Backbone, ItemBaseView, MenuBundleTemplate) {
  var MenuBundleView;
  return MenuBundleView = ItemBaseView.extend({
    template: _.template(MenuBundleTemplate),
    className: "menuBundle"
  });
});

/*
//@ sourceMappingURL=MenuBundleView.js.map
*/