define [
  "underscore"
  "backbone"
  "backboneLocalStorage"
  "models/StoreModel"
  "services/server"
], (_, Backbone, backboneLocalStorage, StoreModel, server) ->

  StateModel = Backbone.Model.extend

    localStorage: new Backbone.LocalStorage("StateModel")

    defaults:
      # id needed for singleton
      id: 0

      # store specific data
      storeAlias: ""
      storeModel: null
      changedStore: false
      storeFetchDate: null

      # header state
      isClientHeaderActive: false

      # route names
      currentRoute: ""
      prevRoute: ""


    # TODO: clean up
    initialize: ->
      server.initialize()

      # laod from localStorage if exists
      @fetch()
      storeModel = @get("storeModel")
      @_listenForStoreInternalChanges()  if storeModel

      # save on change
      @on "change", (->

        # console.log('state saved:');
        # console.log(this.changedAttributes());
        @save {},
          silent: true

        @_setStoreAliasForServer()
      ), this

      # initialize store model if needed
      minimumFetchTimestamp = new Date().getTime() - (3 * 60 * 60 * 1000)
      realFetchDate = @get("storeFetchDate") or new Date(0)
      needsRefetch = realFetchDate.getTime() < minimumFetchTimestamp
      @_fetchStoreModelFromServer()  if @get("storeAlias") isnt ""

      # save old route
      @on "change:currentRoute", (->
        @set
          prevRoute: @previous("currentRoute")
        ,
          silent: true

      ), this

      # load new store on alias change
      @on "change:storeAlias", (->
        currentStoreModel = @get("storeModel")
        @_fetchStoreModelFromServer()  if not currentStoreModel or @get("storeAlias") isnt currentStoreModel.get("alias")

        # switch to store header
        @set "isClientHeaderActive", false
      ), this
      @_setStoreAliasForServer()

    toJSON: ->
      attributes = _.clone(@attributes)
      attributes.storeModel = attributes.storeModel.toJSON()  if attributes.hasOwnProperty("storeModel")
      attributes

    parse: (response) ->
      if response.hasOwnProperty("storeModel")
        currentStoreModel = @get("storeModel")

        # if storeModel already initialized it doesn't need to be initialize twice
        if currentStoreModel
          response.storeModel = currentStoreModel
        else
          response.storeModel = new StoreModel(response.storeModel,
            parse: true
          )
      response.storeFetchDate = new Date(response.storeFetchDate)
      response

    _setStoreAliasForServer: ->

      # mirror changes in store alias to ajax config
      server.setStoreAlias @get("storeAlias")

    _fetchStoreModelFromServer: ->

      errorOccured = false
      storeModel = new StoreModel(alias: @get("storeAlias"))
      storeModel.fetch

        # needed because other views depend on store models
        async: false
        error: ->
          errorOccured = true


      # check if store was avaiable
      if errorOccured
        @set "storeModel", null
      else
        @set
          # cache store changed in boolean
          # needed if listener for storeAlias:change wasn't initialized yet in cartModel
          changedStore: true

        storeModel = @_selectCachedStoreModel(storeModel)
        @set
          storeModel: storeModel
          storeFetchDate: new Date()

        @_listenForStoreInternalChanges()

    _selectCachedStoreModel: (storeModel) ->
      selectedAreaModel = undefined
      oldStoreModel = @get("storeModel")
      if oldStoreModel
        oldDeliveryAreasCollection = oldStoreModel.get("deliveryAreasCollection")
        oldDeliveryAreaModel = oldDeliveryAreasCollection.find((deliveryAreaModel) ->
          deliveryAreaModel.get("isSelected") is true
        )
        if oldDeliveryAreaModel
          newDeliveryAreasCollection = storeModel.get("deliveryAreasCollection")
          newDeliveryAreaModel = newDeliveryAreasCollection.find((deliveryAreaModel) ->
            deliveryAreaModel.get("postal") is oldDeliveryAreaModel.get("postal") and (deliveryAreaModel.get("district") is oldDeliveryAreaModel.get("district") or deliveryAreaModel.get("city") is oldDeliveryAreaModel.get("district"))
          )
          if newDeliveryAreaModel
            @set
              changedStore: false
            newDeliveryAreaModel.set "isSelected", true

      storeModel

    _listenForStoreInternalChanges: ->
      storeModel = @get("storeModel")
      storeModel.on "change", (->
        @trigger "change"
      ), this


    # needed for cart model
    hasChangedStore: ->
      if @get("changedStore")
        @set "changedStore", false
        return true
      false

    doesStoreExist: ->
      @get("storeModel") isnt null

    currentRouteIsClientRelated: ->
      currentRoute = @get("currentRoute")
      clientRoutes = [
        "client.dashboard"
        "client.config"
        "store.config"
        "store.dashboard"
        "store.assortment"
      ]
      _.contains clientRoutes, currentRoute

    currentRouteIsStoreRelated: ->
      currentRoute = @get("currentRoute")
      prefix = currentRoute.split(".")[0]
      prefix is "store"

    clientOwnsThisStore: ->
      storeModel = @get("storeModel")

      # check with number since number only gets set if client fetches store model
      storeModel.get("number") isnt 0

  new StateModel()

