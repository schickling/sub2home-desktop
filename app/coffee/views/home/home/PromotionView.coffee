define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "services/postalOracle"
  "text!templates/home/home/PromotionTemplate.html"
], ($, _, Backbone, notificationcenter, postalOracle, PromotionTemplate) ->

  PromotionView = Backbone.View.extend

    events:
      "click #submitStoreSuggestion": "_submit"

    initialize: ->
      @_render()

    _render: ->
      @$el.html PromotionTemplate

    show: ->
      @$el.fadeIn()

    hide: ->
      @$el.fadeOut()

    _submit: ->
      @hide()
      input = @$("#suggestStoreMessage").val()
      postal = postalOracle.getPostal()
      text = "Message: \"" + input + "\" Postal:" + postal
      $.ajax
        url: "services/promotion"
        data: JSON.stringify(text: text)
        type: "post"
        dataType: "json"
        contentType: "application/json; charset=utf-8"
        success: (response) ->
          notificationcenter.notify "views.home.home.promotion.success"

        error: ->
          notificationcenter.notify "views.home.home.promotion.error"

