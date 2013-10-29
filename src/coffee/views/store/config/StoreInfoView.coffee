define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "views/store/config/AddressView"
  "text!templates/store/config/StoreInfoTemplate.html"
  ], ($, _, Backbone, notificationcenter, AddressView, StoreInfoTemplate) ->

  StoreInfoView = Backbone.View.extend

    events:
      "focusout #storeDescriptionInput": "_updateDescription"
      "focusout #storeOrderingContactInput": "_updateOrderEmail"
      "focusout #storeFacebookInput": "_updateFacebookUrl"
      "click #bMail": "_sendTestOrder"
      "click #storeOpen": "_toggleOpen"
      "click #payment button.toggle": "_togglePaymentMethod" # payment methods

    initialize: ->
      @_render()
      @_enableTooltips()

    _render: ->
      json =
        number: @model.get("number")
        title: @model.get("title")
        orderEmail: @model.get("orderEmail")
        isOpen: @model.get("isOpen")
        facebookUrl: @model.get("facebookUrl").replace('https://www.facebook.com/', '')
        allowsPaymentEc: @model.get("allowsPaymentEc")
        allowsPaymentCash: @model.get("allowsPaymentCash")

      @$el.html _.template(StoreInfoTemplate, json)
      new AddressView(
        el: @$("#storeAddress")
        model: @model
      )

    _enableTooltips: ->
      notificationcenter.tooltip(@$("#bMail"))

    _updateDescription: (e) ->
      $textarea = $(e.target)
      description = $textarea.val()
      @model.set "description", description
      @_saveModel()

    _updateOrderEmail: (e) ->
      $input = $(e.target)
      val = $input.val()
      @model.set "orderEmail", val
      @_saveModel()

    _updateFacebookUrl: (e) ->
      $input = $(e.target)
      val = "https://www.facebook.com/#{$input.val()}"
      @model.set "facebookUrl", val
      @_saveModel()

    _sendTestOrder: ->
      $.ajax
        url: "stores/storeAlias/testorder"
        type: "post"
        success: ->
          notificationcenter.notify "views.store.config.testOrder.success"
        error: ->
          notificationcenter.notify "views.store.config.testOrder.error"

    _toggleOpen: ->
      $button = @$("#storeOpen")
      isOpen = not @model.get("isOpen")
      @model.set "isOpen", isOpen
      @model.save {},
        success: ->
          if isOpen
            notificationcenter.notify "views.store.config.isOpen"
          else
            notificationcenter.notify "views.store.config.isClosed"
          $button.toggleClass "isOpen"
        error: ->
          notificationcenter.notify "views.store.config.isOpenError"

    _togglePaymentMethod: (e) ->
      storeModel = @model
      $button = $(e.target)
      $wrapper = $button.parent()
      method = $button.attr("data-method")
      attribute = "allowsPayment" + method
      value = not @model.get(attribute)
      changedAttributes = {}
      changedAttributes[attribute] = value
      @model.save changedAttributes,
        validate: true
        success: ->
          notificationcenter.notify "views.store.config.paymentMethods.success"
          $wrapper.toggleClass "disabled"
        error: ->
          notificationcenter.notify "views.store.config.paymentMethods.error"

    _saveModel: ->
      @model.save {},
        success: ->
          notificationcenter.notify "views.store.config.info.success"
        error: ->
          notificationcenter.notify "views.store.config.info.error"
