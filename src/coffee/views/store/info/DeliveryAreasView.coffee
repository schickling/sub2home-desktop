define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/info/DeliveryAreaView"
], ($, _, Backbone, DeliveryAreaView) ->

  DeliveryAreasView = Backbone.View.extend

    $firstColumn: null
    $secondColumn: null

    initialize: ->
      @_cacheDom()
      @_render()

    _cacheDom: ->
      @$firstColumn = @$(".fluidColumn").first()
      @$secondColumn = @$(".fluidColumn").last()

    _render: ->
      collectionSize = @collection.length
      lastPostal = undefined
      _.each @collection.models, ((deliveryAreaModel, index) ->
        @_renderDeliveryArea deliveryAreaModel, index / collectionSize <= 0.5, deliveryAreaModel.get("postal") is lastPostal
        lastPostal = deliveryAreaModel.get("postal")
      ), this

    _renderDeliveryArea: (deliveryAreaModel, placeInFirstCollumn, hidePostal) ->
      deliveryAreaView = new DeliveryAreaView(model: deliveryAreaModel)
      if placeInFirstCollumn
        @$firstColumn.append deliveryAreaView.el
      else
        @$secondColumn.append deliveryAreaView.el
      deliveryAreaView.$el.toggleClass "hidePostal", hidePostal

