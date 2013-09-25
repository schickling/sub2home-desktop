define ["underscore", "backbone", "models/OrderedItemModel"], (_, Backbone, OrderedItemModel) ->

  OrderedItemsCollection = Backbone.Collection.extend

    model: OrderedItemModel

    getTotal: ->
      total = 0
      @each (orderedItemModel) ->
        total += orderedItemModel.get("total")
      total