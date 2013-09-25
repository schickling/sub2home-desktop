define ["underscore", "backbone", "models/MenuUpgradeModel"], (_, Backbone, MenuUpgradeModel) ->


  MenuUpgradesCollection = Backbone.Collection.extend(
    model: MenuUpgradeModel
    url: ->
      "stores/storeAlias/menuupgrades"
  )

  MenuUpgradesCollection