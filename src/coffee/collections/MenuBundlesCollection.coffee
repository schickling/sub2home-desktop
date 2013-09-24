define ["underscore", "backbone", "models/MenuBundleModel"], (_, Backbone, MenuBundleModel) ->
  "use strict"
  MenuBundlesCollection = Backbone.Collection.extend(
    model: MenuBundleModel
    url: ->
      "stores/storeAlias/menubundles"
  )
  MenuBundlesCollection