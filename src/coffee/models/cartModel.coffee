define ["underscore", "backbone", "backboneLocalStorage", "models/stateModel", "models/OrderModel"], (_, Backbone, backboneLocalStorage, stateModel, OrderModel) ->

  CartModel = Backbone.Model.extend

    localStorage: new Backbone.LocalStorage("CartModel")

    defaults:
      id: 0 # id needed for singleton
      orderModel: null
      termsAccepted: false
      isClosed: false

    initialize: ->
      @_initializeData()

      # determine if on last reload store was changed
      @_resetOrderModel()  if stateModel.hasChangedStore()

      @_listenToStoreModelChange()
      @_listenToDeliveryAreaSelection()
      @_adjustCustomerAddress()

    toJSON: ->
      attributes = _.clone(@attributes)
      attributes.orderModel = attributes.orderModel.toJSON()  if attributes.hasOwnProperty("orderModel")
      attributes

    parse: (response) ->
      if response.hasOwnProperty("orderModel")

        # following distinction takes place because parse is called every time
        # the cart model gets saved
        currentOrderModel = @get("orderModel")

        # if addressModel already initialized it doesn't need to be initialize twice
        if currentOrderModel
          response.orderModel = currentOrderModel
        else
          response.orderModel = new OrderModel response.orderModel, parse: true
      response

    getCustomerAddressModel: ->
      orderModel = @get("orderModel")
      orderModel.get "addressModel"

    getOrderedItemsCollection: ->
      orderModel = @get("orderModel")
      orderModel.get "orderedItemsCollection"

    addOrderedItemModel: (orderedItemModel) ->
      @set "isClosed", false
      orderedItemsCollection = @getOrderedItemsCollection()
      orderedItemModel.trigger "recalculate"
      orderedItemsCollection.add orderedItemModel
      orderedItemModel.set "isInCart", true

    getPaymentMethod: ->
      orderModel = @get("orderModel")
      orderModel.get "paymentMethod"

    setPaymentMethod: (paymentMethod) ->
      orderModel = @get("orderModel")
      orderModel.set {
        paymentMethod: paymentMethod
      }, {
        validate: true
      }

    getTotal: ->
      orderModel = @get("orderModel")
      orderModel.get "total"

    getTip: ->
      orderModel = @get("orderModel")
      orderModel.get "tip"

    getNumberOfOrderedItems: ->
      orderModel = @get("orderModel")
      orderedItemsCollection = orderModel.get("orderedItemsCollection")
      numberOfOrderedItems = 0
      _.each orderedItemsCollection.models, (orderedItemModel) ->
        numberOfOrderedItems += orderedItemModel.get("amount")
      numberOfOrderedItems

    getComment: ->
      orderModel = @get("orderModel")
      orderModel.get "comment"

    setComment: (comment) ->
      orderModel = @get("orderModel")
      orderModel.set {
        comment: comment
      }, {
        validate: true
      }

    getMinimumValue: ->
      storeModel = stateModel.get("storeModel")
      storeModel.getMinimumValue()

    getMinimumDuration: ->
      storeModel = stateModel.get("storeModel")
      storeModel.getMinimumDuration()

    isMinimumReached: ->
      orderModel = @get("orderModel")
      storeModel = stateModel.get("storeModel")
      orderModel.get("total") >= storeModel.getMinimumValue()

    cleanUp: ->
      orderModel = @get("orderModel")
      orderModel.get("orderedItemsCollection").reset()
      orderModel.set
        total: 0
        tip: 0
        comment: ""
        couponCode: ""
        subcardCode: ""

      @set "termsAccepted", false

    isCouponCodeValid: ->
      @get("orderModel").isCouponCodeValid()

    _initializeData: ->
      # fetch if exists
      couldBeFetched = true
      @fetch error: ->
        couldBeFetched = false

      @on "change", (->
        @save {},
          silent: true

      ), this
      @set "orderModel", new OrderModel()  unless couldBeFetched
      @_listenToOrderModel()

    _resetOrderModel: ->
      # reset order model
      addressModel = @get("orderModel").get("addressModel")
      orderModel = new OrderModel({
        addressModel: addressModel
        })
      @set "orderModel", orderModel
      @_listenToOrderModel()
      @_adjustCustomerAddress()

    _listenToOrderModel: ->
      orderModel = @get("orderModel")

      # listen for changes in order model
      orderModel.on "change", =>
        @trigger "change"

    _listenToStoreModelChange: ->
      stateModel.on "change:storeModel", =>
        # reset ordered items collection on store change
        @_resetOrderModel()
        @_listenToDeliveryAreaSelection()

    _listenToDeliveryAreaSelection: ->
      storeModel = stateModel.get("storeModel")
      storeModel.on "change", @_adjustCustomerAddress, this  if storeModel

    _adjustCustomerAddress: ->
      # copy postal and city to customer address
      storeModel = stateModel.get("storeModel")
      orderModel = @get("orderModel")
      addressModel = orderModel.get("addressModel")
      selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel()
      addressModel.set
        postal: selectedDeliveryAreaModel.get("postal")
        city: selectedDeliveryAreaModel.get("city")
        district: selectedDeliveryAreaModel.get("district")


  new CartModel()
