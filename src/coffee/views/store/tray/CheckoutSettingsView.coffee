define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "models/stateModel"
  "models/cartModel"
  "text!templates/store/tray/CheckoutSettingsTemplate.html"
], ($, _, Backbone, notificationcenter, stateModel, cartModel, CheckoutSettingsTemplate) ->

  CheckoutSettingsView = Backbone.View.extend

    isLocked: false
    template: _.template(CheckoutSettingsTemplate)

    events:
      "click #save": "_hide"
      "focusout input": "_saveAddressData"
      "click #paymentSettings span": "_choosePayment"

    initialize: ->
      @model = cartModel.getCustomerAddressModel()
      @_render()
      @_enableTooltips()
      @_listenToValidation()

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

    _enableTooltips: ->
      $inputs = @$("input")
      notificationcenter.tooltip $inputs
      $inputs.tooltipster "disable"

    _listenToValidation: ->
      # @listenTo(@model, "invalid", (model, error) ->
      #   console.log error
      # )

    _saveAddressData: (e) ->
      $input = $(e.target)
      attribute = $input.attr("data-attribute")
      value = $input.val()

      # notation needed to interpolate dynamic attribute variable
      changedAttributes = {}
      changedAttributes[attribute] = value

      if @model.validate(changedAttributes)
        $input.tooltipster "enable"
        $input.tooltipster "show"
        $input.addClass "invalid"
      else
        $input.tooltipster "hide"
        $input.tooltipster "disable"
        $input.removeClass "invalid"

      # gets saved later
      @model.set changedAttributes,
        silent: true

    _choosePayment: (e) ->
      $span = $(e.target)
      method = $span.attr("data-method")
      $span.addClass("selected").siblings().removeClass "selected"
      cartModel.setPaymentMethod method

    _hide: ->
      # trigger validation and save the address
      valid = !!@model.set({},
        validate: true
      )
      if valid
        @model.trigger "change"
        @$el.trigger "hide"


