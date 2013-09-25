define ["underscore", "backbone", "models/OrderModel"], (_, Backbone, OrderModel) ->

  OrderCollection = Backbone.Collection.extend(
    model: OrderModel
    comparator: (orderModel) ->
      -(orderModel.id)

    url: ->
      "stores/storeAlias/orders"
  )
  OrderCollection