define [
  "jquery"
  "underscore"
  "backbone"
  "models/stateModel"
  "models/cartModel"
  "text!templates/store/tray/CheckoutSettingsTemplate.html"
], ($, _, Backbone, stateModel, cartModel, CheckoutSettingsTemplate) ->

  CheckoutSettingsView = Backbone.View.extend

    isLocked: false
    template: _.template(CheckoutSettingsTemplate)

    events:
      "click #save": "_hide"
      "focusout input": "_prepareSaveAddressData"
      "click #paymentSettings span": "_choosePayment"

    initialize: ->
      @model = cartModel.getCustomerAddressModel()
      @_render()
      @_markFilledFields()

    _render: ->
      storeModel = stateModel.get("storeModel")
      json =
        firstName: @model.get("firstName")
        lastName: @model.get("lastName")
        street: @model.get("street")
        streetAdditional: @model.get("streetAdditional")
        streetNumber: @model.get("streetNumber")
        city: @model.get("city")
        district: @model.get("district")
        phone: @model.get("phone")
        email: @model.get("email")
        postal: @model.get("postal")
        selectedPaymentMethod: cartModel.getPaymentMethod()
        allowsPaymentCash: storeModel.get("allowsPaymentCash")
        allowsPaymentEc: storeModel.get("allowsPaymentEc")
        allowsPaymentPaypal: storeModel.get("allowsPaymentPaypal")

      @$el.html @template(json)

    _markFilledFields: ->
      @$("input").each (index, element) =>
        $element = $(element)
        @_saveAddressData($element)  if $element.val() isnt ""

    _prepareSaveAddressData: (e) ->
      @_saveAddressData($(e.target))

    _saveAddressData: ($input) ->
      $wrapper = $input.parent()
      attribute = $input.attr("data-attribute")
      value = $input.val()

      # notation needed to interpolate dynamic attribute variable
      changedAttributes = {}
      changedAttributes[attribute] = value

      if @model.validate(changedAttributes)
        $wrapper.addClass "invalid"
        $wrapper.removeClass "passed"
        console.log 'jo'
      else
        $wrapper.toggleClass "passed", value isnt ""
        $wrapper.removeClass "invalid"

      # gets saved later
      @model.set changedAttributes,
        silent: true

    _choosePayment: (e) ->
      $span = $(e.target)
      method = $span.attr("data-method")
      $span.addClass("selected").siblings().removeClass "selected"
      cartModel.setPaymentMethod method

    _hide: ->
      @$("input").each (index, element) =>
        @_saveAddressData($(element))

      # trigger validation and save the address
      valid = !!@model.set({},
        validate: true
      )
      if valid
        @model.trigger "change"
        @$el.trigger "hide"


