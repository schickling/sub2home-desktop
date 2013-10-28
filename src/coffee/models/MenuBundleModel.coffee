define [
  "underscore"
  "backbone"
  "models/MenuModel"
], (_, Backbone, MenuModel) ->

  MenuBundleModel = MenuModel.extend

    defaults:
      menuComponentBlocksCollection: null
      title: ""
      description: ""
      smallImage: ""
      largeImage: ""
      price: ""
      # for assortment
      isActive: false
      customPrice: 0
      buyed: 0

    urlRoot: "stores/storeAlias/menubundles"


