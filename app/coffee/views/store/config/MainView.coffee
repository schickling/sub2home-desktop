define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "models/stateModel"
  "views/PageView"
  "views/store/config/MapView"
  "views/store/config/StoreInfoView"
  "views/store/config/DeliveryAreasView"
  "views/store/config/DeliveryTimesView"
  "views/store/config/StoreClosePopupView"
  "text!templates/store/config/MainTemplate.html"
], ($, _, Backbone, router, stateModel, PageView, MapView, StoreInfoView, DeliveryAreasView, DeliveryTimesView, StoreClosePopupView, MainTemplate) ->

  MainView = PageView.extend

    # referenced sub views
    subViews:
      mapView: null

    initialize: ->

      # for authentification reload the store model
      @model = stateModel.get("storeModel")
      @model.fetch
        url: "stores/storeAlias/auth" # use custom route
        async: false


      # set page title
      @pageTitle = "Storeeinstellungen " + @model.get("title") + " - sub2home"

      # check if client is allowed to view this page
      if stateModel.clientOwnsThisStore()
        @_render()
      else
        router.navigate "login",
          trigger: true
          replace: true


    _render: ->
      @$el.html MainTemplate
      @subViews.mapView = new MapView(
        el: @$("#storeMap")
        model: @model.get("addressModel")
      )
      @subViews.storeClosePopupView = new StoreClosePopupView(
        el: @$("#storeClosePopup")
        model: @model
      )
      new StoreInfoView(
        el: @$("#storeInfo")
        model: @model
      )
      new DeliveryAreasView(
        el: @$("#deliveryAreas")
        collection: @model.get("deliveryAreasCollection")
      )
      new DeliveryTimesView(
        el: @$("#deliveryTimes")
        collection: @model.get("deliveryTimesCollection")
      )
      @append()

