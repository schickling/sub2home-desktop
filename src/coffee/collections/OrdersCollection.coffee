define ["underscore", "backbone", "models/OrderModel"], (_, Backbone, OrderModel) ->

  OrdersCollection = Backbone.Collection.extend

    model: OrderModel

    url: "stores/storeAlias/orders"

    comparator: (orderModel) ->
      -(orderModel.id)

