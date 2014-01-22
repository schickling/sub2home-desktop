define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/home/info/StoreTemplate.html"
], ($, _, Backbone, StoreTemplate) ->

  StoreView = Backbone.View.extend

    template: _.template(StoreTemplate)

    initialize: ->
      @_render()

    _render: ->
      json =
        title: @model.get "title"
        alias: @model.get "alias"
        isOpen: @model.get "isOpen"
        isDelivering: @model.isDelivering()

      unless json.isDelivering
        nextDeliveryTimeModel = @model.getNextDeliveryTimeModel()
        json.nextDeliveryTime = nextDeliveryTimeModel.getStartTime()

      @$el.html @template(json)
