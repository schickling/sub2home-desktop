define [
  "underscore"
  "backbone"
  "models/MenuModel"
], (_, Backbone, MenuModel) ->

  MenuUpgradeModel = MenuModel.extend

    defaults:
      menuComponentBlocksCollection: null
      title: ""
      description: ""
      price: ""
      # for assortment
      isActive: false
      customPrice: 0
      buyed: 0

    urlRoot: "stores/storeAlias/menuupgrades"

