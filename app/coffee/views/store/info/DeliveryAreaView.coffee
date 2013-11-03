define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/info/DeliveryAreaTemplate.html"
], ($, _, Backbone, DeliveryAreaTemplate) ->

  DeliveryAreaView = Backbone.View.extend

    template: _.template(DeliveryAreaTemplate)
    className: "infoDeliveryArea"

    initialize: ->
      @_render()

    _render: ->
      json =
        postal: @model.get("postal")
        city: @model.get("city")
        district: @model.get("district")
        minimumDuration: @model.get("minimumDuration")
        minimumValue: @model.get("minimumValue")

      @$el.html @template(json)

