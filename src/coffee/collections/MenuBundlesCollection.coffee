define ["underscore", "backbone", "models/MenuBundleModel"], (_, Backbone, MenuBundleModel) ->

  MenuBundlesCollection = Backbone.Collection.extend

    model: MenuBundleModel

    url: ->
      "stores/storeAlias/menubundles"
