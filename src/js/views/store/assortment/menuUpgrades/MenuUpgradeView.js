define(["jquery", "underscore", "backbone", "views/store/assortment/ItemBaseView", "text!templates/store/assortment/menuUpgrades/MenuUpgradeTemplate.html"], function($, _, Backbone, ItemBaseView, MenuUpgradeTemplate) {
  var MenuUpgradeView;
  return MenuUpgradeView = ItemBaseView.extend({
    template: _.template(MenuUpgradeTemplate),
    className: "menuUpgrade"
  });
});

/*
//@ sourceMappingURL=MenuUpgradeView.js.map
*/