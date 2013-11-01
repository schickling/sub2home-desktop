define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "services/notificationcenter"
  "models/stateModel"
  "models/cartModel"
  "text!templates/header/CartTemplate.html"
], ($, _, Backbone, router, notificationcenter, stateModel, cartModel, CartTemplate) ->

  CartView = Backbone.View.extend

    template: _.template(CartTemplate)

    events:
      click: "_goToTray"

    initialize: ->
      @model = cartModel
      @_render()
      @_enableTooltips()
      @_listenToNewDeliveryArea()
      @_listenToNewArticle()
      @model.on "change", @_render, this

    _listenToNewDeliveryArea: ->
      storeModel = stateModel.get("storeModel")

      # listen to store model is enough since store models get changed
      # if a new delivery area is selected
      storeModel.on "change", @_render, this

    _listenToNewArticle: ->
      cartModel.on "itemAdded", =>
        @$el.tooltipster "show"
        setTimeout (=>
          @$el.tooltipster "hide"
          ), 3000

    _enableTooltips: ->
      notificationcenter.tooltip @$el

    _render: ->
      storeModel = stateModel.get("storeModel")
      selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel()
      amount = @model.getNumberOfOrderedItems()
      json =
        amount: amount
        minimum: selectedDeliveryAreaModel.get("minimumValue")
        total: @model.getTotal()

      @$el.html @template(json)
      @$el.toggleClass "filled", (amount > 0)
      if amount > 0
        @$el.addClass "justFilled"
        that = this
        setTimeout (->
          that.$el.removeClass "justFilled"
        ), 800

    _goToTray: ->
      if @model.getNumberOfOrderedItems() > 0
        router.navigate "store/tablett", true
      else
        notificationcenter.notify "views.header.cart.empty"
