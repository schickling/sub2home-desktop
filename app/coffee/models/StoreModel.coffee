define ["underscore", "backbone", "services/notificationcenter", "models/AddressModel", "collections/DeliveryAreasCollection", "collections/DeliveryTimesCollection", "collections/InvoicesCollection"], (_, Backbone, notificationcenter, AddressModel, DeliveryAreasCollection, DeliveryTimesCollection, InvoicesCollection) ->

  StoreModel = Backbone.Model.extend

    defaults:
      title: ""
      alias: ""
      facebookUrl: ""
      # payment methods
      allowsPaymentCash: false
      allowsPaymentEc: false
      allowsPaymentPaypal: false
      orderEmail: ""
      messageType: ""
      messageText: ""
      isMessageActive: false
      deliveryAreasCollection: null
      deliveryTimesCollection: null
      invoicesCollection: null
      addressModel: null
      number: 0
      # needed in client.dashboard
      numberOfUndoneOrders: 0
      deliveryAreaWasSelected: false

    idAttribute: "alias"

    urlRoot: "stores"

    initialize: ->
      # listen for changes in delivery areas/times collection
      @on "change:deliveryAreasCollection", (->
        @_listenForDeliveryAreasCollectionChanges()
      ), this
      @on "change:deliveryTimesCollection", (->
        @_listenForDeliveryTimesCollectionChanges()
      ), this

      # throw errors
      @on "invalid", (model, error) ->
        notificationcenter.notify "models.storeModel.invalid",
          error: error

      @_listenForDeliveryAreasCollectionChanges()
      @_listenForDeliveryTimesCollectionChanges()

    toJSON: ->
      attributes = _.clone(@attributes)
      attributes.addressModel = attributes.addressModel.toJSON()  if attributes.hasOwnProperty("addressModel") and attributes.addressModel
      attributes.deliveryAreasCollection = attributes.deliveryAreasCollection.toJSON()  if attributes.hasOwnProperty("deliveryAreasCollection") and attributes.deliveryAreasCollection
      attributes.deliveryTimesCollection = attributes.deliveryTimesCollection.toJSON()  if attributes.hasOwnProperty("deliveryTimesCollection") and attributes.deliveryTimesCollection
      attributes.invoicesCollection = attributes.invoicesCollection.toJSON()  if attributes.hasOwnProperty("invoicesCollection") and attributes.invoicesCollection
      attributes

    parse: (response) ->
      if response
        if response.hasOwnProperty("addressModel")
          response.addressModel = new AddressModel(response.addressModel,
            parse: true
          )
        response.deliveryAreasCollection = new DeliveryAreasCollection(response.deliveryAreasCollection)  if response.hasOwnProperty("deliveryAreasCollection")
        response.deliveryTimesCollection = new DeliveryTimesCollection(response.deliveryTimesCollection)  if response.hasOwnProperty("deliveryTimesCollection")
        response.invoicesCollection = new InvoicesCollection(response.invoicesCollection)  if response.hasOwnProperty("invoicesCollection") and response.invoicesCollection
        response

    validate: (attributes) ->
      "at least one payment method has to be selected"  if not attributes.allowsPaymentPaypal and not attributes.allowsPaymentEc and not attributes.allowsPaymentCash

    isDelivering: ->
      @_getCurrentDeliveryTimeModel() isnt null

    isDeliveringToday: ->
      @getNextDeliveryTimeModel().get("dayOfWeek") is new Date().getDay()

    getNextDeliveryTimeModel: ->
      deliveryTimesCollection = @get("deliveryTimesCollection")
      deliveryTimesCollection.getNextDeliveryTimeModel(new Date())

    getMinimumValue: ->
      selectedDeliveryAreaModel = @getSelectedDeliveryAreaModel()
      selectedDeliveryAreaModel.get "minimumValue"

    getMinimumDuration: ->
      selectedDeliveryAreaModel = @getSelectedDeliveryAreaModel()
      selectedDeliveryAreaModel.get "minimumDuration"

    getSelectedDeliveryAreaModel: () ->
      deliveryAreasCollection = @get("deliveryAreasCollection")
      return  unless deliveryAreasCollection
      selectedDeliveryAreaModel = deliveryAreasCollection.find((deliveryAreaModel) ->
        deliveryAreaModel.get "isSelected"
      )

      # lazy select delivery area after it got parsed from server
      # and thus the customer didn't selected a delivery area
      if selectedDeliveryAreaModel
        return selectedDeliveryAreaModel
      else
        # TODO remove!!!
        return deliveryAreasCollection.first().set
          isSelected: true
        ,
          silent: true

    _getCurrentDeliveryTimeModel: ->
      currentDeliveryModel = null
      deliveryTimesCollection = @get("deliveryTimesCollection")
      _.each deliveryTimesCollection.models, (deliveryTimeModel) ->
        if deliveryTimeModel.checkIfNow()
          currentDeliveryModel = deliveryTimeModel
          return
      currentDeliveryModel

    _listenForDeliveryAreasCollectionChanges: ->
      deliveryAreasCollection = @get("deliveryAreasCollection")
      if deliveryAreasCollection
        deliveryAreasCollection.on "add remove change", (->
          @set(
            deliveryAreaWasSelected: true
          ,
            silent: true
          ).trigger "change"
        ), this

    _listenForDeliveryTimesCollectionChanges: ->
      deliveryTimesCollection = @get("deliveryTimesCollection")
      if deliveryTimesCollection
        deliveryTimesCollection.on "add remove change", (->
          @trigger "change"
        ), this

    _addMinutesToDate: (date, minutes) ->
      new Date(date.getTime() + minutes * 60000)

