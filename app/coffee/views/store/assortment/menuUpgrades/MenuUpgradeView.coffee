define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/ItemBaseView"
  "text!templates/store/assortment/menuUpgrades/MenuUpgradeTemplate.html"
], ($, _, Backbone, ItemBaseView, MenuUpgradeTemplate) ->

  MenuUpgradeView = ItemBaseView.extend
    template: _.template(MenuUpgradeTemplate)
    className: "menuUpgrade"

