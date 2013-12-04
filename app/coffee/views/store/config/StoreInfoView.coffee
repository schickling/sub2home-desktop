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
      "focusout #storeInfoMessageInput": "_updateMessageText"
      "focusout #storeOrderingContactInput": "_updateOrderEmail"
      "focusout #storeFacebookInput": "_updateFacebookUrl"
      "click #bMail": "_sendTestOrder"
      "click #storeOpen": "_toggleOpen"
      "click #payment button.toggle": "_togglePaymentMethod"
      "click #storeInfoMessageClasses div": "_setMessageType"
      "click #storeInfoIsMessageActive": "_toggleIsMessageActive"

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
        messageType: @model.get("messageType")
        messageText: @model.get("messageText")
        isMessageActive: @model.get("isMessageActive")

      @$el.html _.template(StoreInfoTemplate, json)
      @$("#storeInfoMessageInput").addClass(@model.get("messageType"))

      new AddressView(
        el: @$("#storeAddress")
        model: @model
      )

    _enableTooltips: ->
      notificationcenter.tooltip(@$("#bMail"))

    _updateMessageText: (e) ->
      @model.save "messageText", e.target.value,
        success: ->
          notificationcenter.notify "views.store.config.messageText.success"
        error: ->
          notificationcenter.notify "views.store.config.messageText.error"

    _updateOrderEmail: (e) ->
      @model.save "orderEmail", e.target.value,
        success: ->
          notificationcenter.notify "views.store.config.orderEmail.success"
        error: ->
          notificationcenter.notify "views.store.config.orderEmail.error"

    _updateFacebookUrl: (e) ->
      facebookUrl = "https://www.facebook.com/#{e.target.value}"
      @model.save "facebookUrl", facebookUrl,
        success: ->
          notificationcenter.notify "views.store.config.facebookUrl.success"
        error: ->
          notificationcenter.notify "views.store.config.facebookUrl.error"

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

    _setMessageType: (e) ->
      @model.save messageType: e.target.dataset.messageType,
        success: =>
          $(e.target).addClass("active").siblings().removeClass("active")
          @$("#storeInfoMessageInput").removeClass().addClass(@model.get("messageType"))

    _toggleIsMessageActive: (e) ->
      @model.save isMessageActive: not @model.get("isMessageActive"),
        success: ->
          if @model.get("isMessageActive")
            notificationcenter.notify "views.store.config.isMessageActive.success"
          else
            notificationcenter.notify "views.store.config.isMessageInactive.success"
          $(e.target).toggleClass("active")
        error: ->
          notificationcenter.notify "views.store.config.isMessageActive.error"
