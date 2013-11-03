define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "models/cartModel"
  "text!templates/store/tray/FreeCookieTemplate.html"
], ($, _, Backbone, notificationcenter, cartModel, FreeCookieTemplate) ->

  FreeCookieView = Backbone.View.extend

    template: _.template(FreeCookieTemplate)
    events:
      "focusin input": "_extendInput"
      "focusout input": "_checkCollapseInput"

    initialize: ->
      @_render()
      @_cacheDom()

    _render: ->
      orderModel = cartModel.get("orderModel")
      couponCode = orderModel.get("couponCode")
      json = code: couponCode
      @$el.html @template(json)
      @_markHasCode()

    _markHasCode: ->
      orderModel = cartModel.get("orderModel")
      @$el.toggleClass "hasCode", orderModel.get("couponCode") isnt ""

    _markIsValid: ->
      @$el.toggleClass "valid", cartModel.isCouponCodeValid()

    _cacheDom: ->
      @$input = @$("input")
      @$label = @$("label")

    _extendInput: ->
      @$label.fadeOut 70
      @$input.delay(70).animate
        width: 390
      , 150

    _checkCollapseInput: ->
      @_saveCode()
      @_markHasCode()
      @_markIsValid()
      unless @$input.val()
        @_collapseInput()
      else
        @_checkCode()

    _collapseInput: ->
      @$label.delay(150).fadeIn 70
      @$input.animate
        width: 86
      , 150

    _checkCode: ->
      if cartModel.isCouponCodeValid()
        notificationcenter.notify "views.store.tray.coupon.valid"
      else
        notificationcenter.notify "views.store.tray.coupon.invalid"

    _saveCode: ->
      orderModel = cartModel.get("orderModel")
      couponCode = @$input.val()
      orderModel.set "couponCode", couponCode

