define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "models/cartModel"
  "models/stateModel"
  "views/PageView"
  "views/store/tray/NoDeliveryView"
  "views/store/tray/DeliveryTimeView"
  "views/store/tray/CommentView"
  "views/store/tray/SubcardView"
  "views/store/tray/MinimumValueView"
  "views/store/tray/FreeCookieView"
  "views/store/tray/ControlView"
  "views/store/tray/CheckoutSettingsView"
  "views/store/tray/OrderedItemsView"
  "text!templates/store/tray/MainTemplate.html"
], ($, _, Backbone, router, cartModel, stateModel, PageView, NoDeliveryView, DeliveryTimeView, CommentView, SubcardView, MinimumValueView, FreeCookieView, ControlView, CheckoutSettingsView, OrderedItemsView, MainTemplate) ->

  MainView = PageView.extend

    events:
      "click .settings": "_showCheckoutSettings"
      # custom dom event because address needs to be checked first
      "hide #checkoutSettings": "_hideCheckoutSettings"
      "click #noDeliveriesToday": "_navigateToHomeHome"

    pageTitle: "Fast fertig - sub2home"

    # referenced sub views
    subViews:
      controlView: null
      deliveryTimeView: null
      minimumValueView: null


    # cached dom
    $checkoutSettings: null
    $trayNote: null
    initialize: ->

      # check if cart is not empty
      if cartModel.getNumberOfOrderedItems() is 0
        router.navigate "store",
          trigger: true
          replace: true

        return
      @_render()

    _render: ->
      @$el.html MainTemplate
      @_cacheDom()
      new OrderedItemsView(el: @$("#orderedItems"))
      if @_storeIsDelivering()
        @subViews.controlView = new ControlView(el: @$("#checkoutBasicControls"))
        @subViews.deliveryTimeView = new DeliveryTimeView(el: @$("#deliveryTimeDisplay"))
        @subViews.minimumValueView = new MinimumValueView(el: @$("#minimumOrderValue"))
        new CommentView(el: @$("#deliveryAdditionalNote"))
        new SubcardView(el: @$("#subcardOption"))
        new FreeCookieView(el: @$("#gratisCookieOption"))
        new CheckoutSettingsView(el: @$checkoutSettings)
      else
        new NoDeliveryView(el: @$("#checkoutControls"))
        @$(".goldenThread").hide()
      @append()

    _cacheDom: ->
      @$checkoutSettings = @$("#checkoutSettings")
      @$trayNote = @$("#trayNote")

    _showCheckoutSettings: ->
      $checkoutSettings = @$checkoutSettings
      $trayNote = @$trayNote
      $checkoutSettings.css height: "auto"
      scrollTop = $trayNote.scrollTop() + $checkoutSettings.height()
      $trayNote.animate scrollTop: scrollTop

    _hideCheckoutSettings: ->
      $checkoutSettings = @$checkoutSettings
      $trayNote = @$trayNote
      scrollTop = $trayNote.scrollTop() - $checkoutSettings.height()
      $trayNote.animate
        scrollTop: scrollTop
      , ->
        $checkoutSettings.css height: 0


    _storeIsDelivering: ->
      stateModel.get("storeModel").isDeliveringToday()

    _navigateToHomeHome: ->
      router.navigate "/", true

