define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/info/DeliveryTimesView"
  "views/store/info/DeliveryAreasView"
  "text!templates/store/info/StoreTemplate.html"
], ($, _, Backbone, DeliveryTimesView, DeliveryAreasView, StoreTemplate) ->

  StoreView = Backbone.View.extend

    template: _.template(StoreTemplate)

    initialize: ->
      @_render()

    _render: ->
      storeModel = @model
      addressModel = storeModel.get("addressModel")
      json =
        title: storeModel.get("title")
        phone: addressModel.get("phone")
        street: addressModel.get("street")
        streetNumber: addressModel.get("streetNumber")
        postal: addressModel.get("postal")
        city: addressModel.get("city")
        email: addressModel.get("email")
        facebookUrl: storeModel.get("facebookUrl")

      @$el.html @template(json)
      @_renderDeliveryTimes()
      @_renderDeliveryAreas()
      @_markPaymentMethods()

    _renderDeliveryTimes: ->
      new DeliveryTimesView(
        el: @$("#infoDeliveryTimes")
        collection: @model.get("deliveryTimesCollection")
      )

    _renderDeliveryAreas: ->
      new DeliveryAreasView(
        el: @$("#infoDeliveryAreas")
        collection: @model.get("deliveryAreasCollection")
      )

    _markPaymentMethods: ->
      paymentMethods = [
        "cash"
        "ec"
      ]
      $paymentMethods = @$("#paymentMethods").find(".threeColumn")
      _.each paymentMethods, ((paymentMethod) ->
        capitalizedPaymentMethod = paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)
        storeAllowsPaymentMethod = @model.get("allowsPayment" + capitalizedPaymentMethod)
        $paymentMethods.filter("." + paymentMethod).addClass "inactive"  unless storeAllowsPaymentMethod
      ), this

