define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/dashboard/details/AddressView"
  "views/store/dashboard/details/OrderedItemsView"
  "views/store/dashboard/details/InfoView"
  "text!templates/store/dashboard/details/OrderDetailsTemplate.html"
], ($, _, Backbone, AddressView, OrderedItemsView, InfoView, OrderDetailsTemplate) ->

  OrderDetailsView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      @$el.html OrderDetailsTemplate
      @_renderAddress()
      @_renderOrderedItems()
      @_renderInfo()

    _renderAddress: ->
      new AddressView(
        el: @$(".address")
        model: @model.get("addressModel")
      )

    _renderOrderedItems: ->
      new OrderedItemsView(
        el: @$(".orderedItems")
        collection: @model.get("orderedItemsCollection")
      )

    _renderInfo: ->
      new InfoView(
        el: @$(".info")
        model: @model
      )

