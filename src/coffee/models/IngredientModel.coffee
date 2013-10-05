define ["underscore", "backbone"], (_, Backbone) ->

  IngredientModel = Backbone.Model.extend

    defaults:
      title: ""
      shortTitle: ""
      shortcut: ""
      description: ""
      largeImage: "default"
      icon: ""
      isSelected: false
      price: 0
      # for assortment
      isActive: false
      customPrice: 0
      buyed: 0

    urlRoot: "stores/storeAlias/ingredients/"

