define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "text!templates/store/config/StoreClosePopupTemplate.html"
], ($, _, Backbone, notificationcenter, StoreClosePopupTemplate) ->

  StoreClosePopupView = Backbone.View.extend

    events:
      "click #closeStoreConfirm": "_confirmClose"
      "click #closeStoreCancel": "_cancel"

    template: _.template(StoreClosePopupTemplate)

    initialize: ->
      @_render()
      @_listenForPopup()
      @_listenForMessageChanges()

    _render: ->
      json =
        messageText: @model.get("messageText")

      @$el.html @template(json)

    _listenForMessageChanges: ->
      @listenTo @model, "change:messageText", @_render

    _listenForPopup: ->
      @listenTo @model, "popupClose", ->
        @$el.show()

    _cancel: ->
      @$el.hide()

    _confirmClose: ->
      messageText = @$(".closedInfoInput").val()
      @model.set "isOpen", false
      @model.set {
        messageText: messageText
      }, {
        silent: true
      }
      @model.save {},
        success: =>
          notificationcenter.notify "views.store.config.isClosed"
          $("#storeOpen").toggleClass "isOpen"
          $("#storeInfoMessageInput").val(messageText)
          @$el.hide()
        error: =>
          notificationcenter.notify "views.store.config.isOpenError"

    destroy: ->
      @stopListening()
