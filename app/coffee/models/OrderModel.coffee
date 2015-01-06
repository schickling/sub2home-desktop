define [
  "jquery"
  "underscore"
  "backbone"
  "moment"
  "services/notificationcenter"
  "services/serverTime"
  "models/AddressModel"
  "models/CreditModel"
  "collections/OrderedItemsCollection"
], ($, _, Backbone, moment, notificationcenter, serverTime, AddressModel, CreditModel, OrderedItemsCollection) ->

  # made global for performance reasons
  now = serverTime.getCurrentDate()

  OrderModel = Backbone.Model.extend

    defaults:
      # paymentMethod
      paymentMethod: "cash"

      # decoded subcard code
      subcardCode: ""

      # coupon code
      couponCode: ""

      # comment
      comment: ""

      # prices
      total: 0
      tip: 0

      # customer address
      addressModel: null
      orderedItemsCollection: null

      # due date
      dueAt: ""
      dueDate: null

      # only needed for store.dashboard
      isDelivered: false
      createdAt: ""
      createdDate: null
      creditModel: null

    urlRoot: ->
      if @isNew()
        "stores/storeAlias/orders"
      else
        "orders"

    initialize: ->

      # initialize ordered items collection and address model
      @_initializeRelations()
      @on "invalid", (model, error) ->
        notificationcenter.notify "models.orderModel.invalid",
          error: error

    _initializeRelations: ->

      # ordered items
      @set "orderedItemsCollection", new OrderedItemsCollection()  unless @get("orderedItemsCollection")

      # listen for changes in ordered items collection
      orderedItemsCollection = @get("orderedItemsCollection")
      orderedItemsCollection.on "add remove reset change", (->

        # trigger change manually since it won't be triggered if price hasn't changed
        @set
          total: orderedItemsCollection.getTotal()
        ,
          silent: true

        @trigger "change"
      ), this

      # due date
      @set "dueDate", serverTime.getCurrentDate()  unless @get("dueDate")

      # address model
      @set "addressModel", new AddressModel()  unless @get("addressModel")

      # listen for addressmodel changes
      @get("addressModel").on "change", (->
        @trigger "change"
      ), this

    parse: (response) ->
      if response
        if response.hasOwnProperty("addressModel")
          response.addressModel = new AddressModel(response.addressModel,
            parse: true
          )
        response.creditModel = new CreditModel(response.creditModel)  if response.hasOwnProperty("creditModel") and response.creditModel
        if response.hasOwnProperty("orderedItemsCollection")
          response.orderedItemsCollection = new OrderedItemsCollection(response.orderedItemsCollection,
            parse: true
          )
        if response.hasOwnProperty("createdAt")
          response.createdDate = new Date(response.createdAt)
        if response.hasOwnProperty("dueAt") and response.dueAt
          response.dueDate = new Date(response.dueAt)
        response

    toJSON: ->
      attributes = _.clone(@attributes)
      attributes.orderedItemsCollection = attributes.orderedItemsCollection.toJSON()  if @get("orderedItemsCollection")
      attributes.addressModel = attributes.addressModel.toJSON()  if @get("addressModel")
      attributes.creditModel = attributes.creditModel.toJSON()  if @get("creditModel")
      if @get("dueDate")
        dueMoment = moment(attributes.dueDate)
        attributes.dueAt = dueMoment.format("YYYY-MM-DD HH:mm:ss")
      attributes

    wasCreatedToday: ->
      now.toDateString() is @get("createdDate").toDateString()

    isPrevailing: ->
      dueMoment = moment @get("dueDate")
      dueMoment.isAfter()

    validate: (attributes) ->
      validPaymentMethods = ["cash", "ec"]
      return "Keine erlaubte Bezahlmethode"  unless _.contains(validPaymentMethods, attributes.paymentMethod)
      comment = attributes.comment
      return "Kommentar ist zu lang"  if comment.length > 1000 or comment.split(/\n|\f/).length > 6
      "Kein erlaubter Wert"  if attributes.total < 0 or attributes.tip < 0

    increaseTip: ->
      tip = @get("tip")
      total = @get("total")
      totalWithTip = total + tip
      step = 0.50
      isRound = (totalWithTip % step) is 0
      if isRound
        tip += step
      else
        benefit = Math.ceil(total) - total
        if benefit > step
          tip = benefit - step
        else
          tip = benefit
      @set
        tip: tip
      ,
        validate: true

    decreaseTip: ->
      tip = @get("tip")
      step = 0.50
      if tip >= step
        tip -= step
      else
        tip = 0
      @set
        tip: tip
      ,
        validate: true

    getNumber: ->
      number = "00000" + @get("id")
      number.substr number.length - 6

    hasCredit: ->
      @get("creditModel") isnt null

    # 10-41786-0-0329-0609
    isCouponCodeValid: ->
      regex = /^(\d){2}-(\d){5}-(\d)-(\d){4}-(\d){4}$/
      code = @get("couponCode")
      regex.test code


