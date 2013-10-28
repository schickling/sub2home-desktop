define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/ItemBaseView"
  "text!templates/store/assortment/menuBundles/MenuBundleTemplate.html"
], ($, _, Backbone, ItemBaseView, MenuBundleTemplate) ->

  MenuBundleView = ItemBaseView.extend
    template: _.template(MenuBundleTemplate)
    className: "menuBundle"


