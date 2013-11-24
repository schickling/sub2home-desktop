define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/home/MessageTemplate.html"
], ($, _, Backbone, MessageTemplate) ->

  MessageView = Backbone.View.extend

    template: _.template(MessageTemplate)

    events:
      "click #closeStoreInfo": "_hide"

    initialize: ->
      @_render()
      @$el.fadeIn()

    _render: ->
      json =
        messageText: @model.get("messageText")
      @$el.html @template(json)
      @$el.addClass @model.get("messageType")

    _hide: (e) ->
      @$el.fadeOut()
