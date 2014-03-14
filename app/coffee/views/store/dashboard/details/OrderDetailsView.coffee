define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/dashboard/details/OrderedItemsView"
  "views/store/dashboard/details/InfoView"
  "text!templates/store/dashboard/details/OrderDetailsTemplate.html"
], ($, _, Backbone, OrderedItemsView, InfoView, OrderDetailsTemplate) ->

  OrderDetailsView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      @$el.html OrderDetailsTemplate
      @_renderOrderedItems()
      @_renderInfo()

    _renderOrderedItems: ->
      new OrderedItemsView(
        el: @$(".orderDetailsItems")
        collection: @model.get("orderedItemsCollection")
      )

    _renderInfo: ->
      new InfoView(
        el: @$(".orderDetailsInfo")
        model: @model
      )

