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
      "click #save": "hide"
      "focusout input": "saveAddressData"
      "click #paymentSettings span": "choosePayment"

    initialize: ->
      @render()

    render: ->
      addressModel = cartModel.getCustomerAddressModel()
      storeModel = stateModel.get("storeModel")
      json =
        firstName: addressModel.get("firstName")
        lastName: addressModel.get("lastName")
        street: addressModel.get("street")
        streetAdditional: addressModel.get("streetAdditional")
        streetNumber: addressModel.get("streetNumber")
        city: addressModel.get("city")
        district: addressModel.get("district")
        phone: addressModel.get("phone")
        email: addressModel.get("email")
        postal: addressModel.get("postal")
        selectedPaymentMethod: cartModel.getPaymentMethod()
        allowsPaymentCash: storeModel.get("allowsPaymentCash")
        allowsPaymentEc: storeModel.get("allowsPaymentEc")
        allowsPaymentPaypal: storeModel.get("allowsPaymentPaypal")

      @$el.html @template(json)

    saveAddressData: (e) ->
      $input = $(e.target)
      attribute = $input.attr("data-attribute")
      value = $input.val()
      addressModel = cartModel.getCustomerAddressModel()

      # array notation needed to interpolate dynamic attribute variable
      changedAttributes = []
      changedAttributes[attribute] = value

      # gets saved later
      addressModel.set changedAttributes,
        silent: true


    choosePayment: (e) ->
      $span = $(e.target)
      method = $span.attr("data-method")
      $span.addClass("selected").siblings().removeClass "selected"
      cartModel.setPaymentMethod method

    hide: ->
      addressModel = cartModel.getCustomerAddressModel()

      # trigger validation and save the address
      valid = !!addressModel.set({},
        validate: true
      )
      if valid
        addressModel.trigger "change"
        @$el.trigger "hide"


