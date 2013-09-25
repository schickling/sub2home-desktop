define ["underscore", "backbone", "models/MenuUpgradeModel"], (_, Backbone, MenuUpgradeModel) ->
  "use strict"

  MenuUpgradesCollection = Backbone.Collection.extend(
    model: MenuUpgradeModel
    url: ->
      "stores/storeAlias/menuupgrades"
  )

  MenuUpgradesCollection