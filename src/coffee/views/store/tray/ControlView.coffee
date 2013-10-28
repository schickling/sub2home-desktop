define [
  "jquery"
  "jqueryColor"
  "underscore"
  "backbone"
  "services/router"
  "services/notificationcenter"
  "models/cartModel"
  "text!templates/store/tray/ControlTemplate.html"
], ($, jqueryColor, _, Backbone, router, notificationcenter, cartModel, ControlTemplate) ->

  ControlView = Backbone.View.extend

    template: _.template(ControlTemplate)

    events:
      "click .orderNow": "_checkout"
      "click #iAGB": "_acceptAGB"
      "click #credit.hasNoCredit": "_showTip"
      "click #credit .bAdd": "_increaseTip"
      "click #credit .bRemove": "_decreaseTip"

    initialize: ->
      @_render()
      @_listenForDataChanges()

    orderIsLocked: false

    _render: ->
      paymentMethod = ""
      switch cartModel.getPaymentMethod()
        when "cash"
          paymentMethod = "in Bar"
        when "ec"
          paymentMethod = "mit EC Karte"
        when "paypal"
          paymentMethod = "via Paypal"
      addressModel = cartModel.getCustomerAddressModel()
      isReady = addressModel.get("firstName") and addressModel.get("lastName") and addressModel.get("street")
      json =
        isReady: isReady
        total: cartModel.getTotal() + cartModel.getTip()
        hasTip: cartModel.getTip() > 0
        firstName: addressModel.get("firstName")
        lastName: addressModel.get("lastName")
        street: addressModel.get("street")
        streetNumber: addressModel.get("streetNumber")
        paymentMethod: paymentMethod
        comment: cartModel.getComment()

      @$el.html @template(json)
      @$el.toggleClass "accepted", cartModel.get("termsAccepted")
      @delegateEvents()

    _listenForDataChanges: ->
      @listenTo cartModel, "change", @_render

    _acceptAGB: ->
      $iAGB = @$("#iAGB")
      $iCart = @$("#iCart")
      $notice = @$("#acceptAGB")
      $notice.removeClass "leftHandBelow"
      $iAGB.fadeOut 100
      $iCart.animate
        "margin-right": 10
        color: $.Color("rgba(156,200,62,0.4)")
      , 150, ->
        cartModel.set "termsAccepted", true


    _checkout: ->
      return  if @orderIsLocked
      orderModel = cartModel.get("orderModel")
      self = this
      unless cartModel.isMinimumReached()
        notificationcenter.notify "views.store.tray.minimumNotReached"
        return
      unless cartModel.get("termsAccepted")
        notificationcenter.notify "views.store.tray.termsNotAccepted"
        return
      @orderIsLocked = true
      orderModel.save {},
        success: ->
          self._ringBell()
          cartModel.cleanUp()
          cartModel.set "isClosed", true
          router.navigate "store/danke",
            trigger: true
            replace: true


        error: ->
          notificationcenter.notify "views.store.tray.orderFailed"
          self.orderIsLocked = false


    _ringBell: ->
      sound = new Audio("https://d3uu6huyzvecb1.cloudfront.net/audio/bell.ogg") # buffers automatically when created
      sound.play()

    #
    #		 * Tip methods
    #
    _showTip: ->
      $credit = @$("#credit")
      $notice = $credit.find(".notice")
      self = this
      $notice.fadeOut 100, ->
        $credit.animate
          width: 100
        , 300, ->
          self._increaseTip()

    _hideTip: ->
      $credit = @$("#credit")
      $notice = $credit.find(".notice")
      orderModel = cartModel.get("orderModel")
      $credit.addClass "hasNoTip"
      $credit.animate
        width: 45
      , 300, ->
        $notice.fadeIn 100, ->
          orderModel.decreaseTip()

    _increaseTip: ->
      orderModel = cartModel.get("orderModel")
      orderModel.increaseTip()

    _decreaseTip: ->
      orderModel = cartModel.get("orderModel")
      if orderModel.get("tip") <= 0.50
        @_hideTip()
      else
        orderModel.decreaseTip()

    destroy: ->
      @stopListening()


