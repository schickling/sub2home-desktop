define ["jquery", "underscore", "backbone", "services/router", "services/notificationcenter", "services/gmaps", "models/stateModel", "views/assets/mapStyles", "views/shared/misc/PostalSearchView", "views/home/home/StoreView", "views/home/home/PromotionView", "collections/StoresCollection"], ($, _, Backbone, router, notificationcenter, gmaps, stateModel, mapStyles, PostalSearchView, StoreView, PromotionView, StoresCollection) ->

  StoresView = Backbone.View.extend

    map: null
    geocoder: null
    postal: null

    # deferreds
    mapDeferred: null
    collectionDeferred: null

    storeViews: null
    promotionView: null
    postalSearchView: null

    # cached dom
    $noteContainer: null
    $deliveryAreaSelection: null
    $mapContainer: null
    $map: null
    $actingHint: null

    initialize: ->
      @storeViews = []
      @_cacheDom()
      @_renderPostalSearchView()
      @_renderPromotionView()
      @_loadStores()
      @_loadMap()
      @_runAndWaitForPostal()

    _cacheDom: ->
      @$noteContainer = @$("#noteContainer")
      @$deliveryAreaSelection = @$noteContainer.find("#deliveryAreaSelection")
      @$mapContainer = @$("#mapContainer")
      @$map = @$mapContainer.find("#map")
      @$actingHint = @$mapContainer.find("#actingHint")

    _renderPostalSearchView: ->
      @postalSearchView = new PostalSearchView(el: @$("#locationSelection"))

    _renderPromotionView: ->
      @promotionView = new PromotionView(el: @$("#suggestStore"))

    _loadStores: ->
      @collection = new StoresCollection()
      @collectionDeferred = @collection.fetch()

    _loadMap: ->
      mapOptions =
        center: new gmaps.LatLng(52.52, 13.4) # Berlin
        zoom: 13
        keyboardShortcuts: false
        disableDefaultUI: true
        draggable: false
        disableDoubleClickZoom: true
        scrollwheel: false
        styles: mapStyles
        mapTypeId: gmaps.MapTypeId.TERRAIN

      @map = new gmaps.Map(@$map.get(0), mapOptions)
      @geocoder = new gmaps.Geocoder()
      @mapDeferred = $.Deferred()

      # wait unitl map is loaded
      gmaps.event.addListenerOnce @map, "idle", =>
        gmaps.event.trigger @map, "resize"
        @mapDeferred.resolve() # init geolocation

    _runAndWaitForPostal: (postal) ->
      @listenTo @postalSearchView, "newPostal", (postal) =>
        $.when(@mapDeferred, @collectionDeferred).done =>
          @postal = postal
          @_lookUpStores()
      @postalSearchView.run()

    _lookUpStores: ->
      storesInRange = @collection.filterByDeliveryPostal(@postal)
      numberOfStores = storesInRange.length
      @_cleanPreviousResults()
      @_adjustProportions()
      if numberOfStores > 0
        notificationcenter.notify "views.home.home.selectStore"  if numberOfStores > 1

        # render stores
        @_renderStores storesInRange

        # render delivery areas
        matchingDeliveryAreas = @_getMatchingDeliveryAreas(storesInRange)
        numberOfOpenStores = storesInRange.reduce ((sum, storeModel) -> sum + storeModel.get("isOpen")), 0
        if matchingDeliveryAreas.length > 1 && numberOfOpenStores > 0
          @_renderDeliveryAreas matchingDeliveryAreas
          @postalSearchView.showDeliveryAreaLabel()
        else
          @postalSearchView.showStoreSelectionLabel()
          matchingDeliveryAreas[0].set "isSelected", true
          @storeViews[0].markAvailable()
        @_hidePromotionView()
      else
        @_noStoresFound()
        @postalSearchView.showLocationLabel()

    _cleanPreviousResults: ->

      # delete old delivery areas
      @$deliveryAreaSelection.hide().html ""

      # destroy old store views
      _.each @storeViews, (storeView) ->
        storeView.remove()

      @storeViews = []

    _renderDeliveryAreas: (deliveryAreaModels) ->

      renderedDistricts = []

      # render new areas
      _.each deliveryAreaModels, (deliveryAreaModel) =>

        district = deliveryAreaModel.get("district") or deliveryAreaModel.get("city")
        unless _.contains(renderedDistricts, district)
          renderedDistricts.push district
          $deliveryArea = $("<span>").text(district)

          # append to list
          @$deliveryAreaSelection.append $deliveryArea

          # bind dom click handler
          $deliveryArea.on "click", =>
            district = $deliveryArea.text()

            # mark dom visited
            $deliveryArea.addClass("selected").siblings().removeClass "selected"

            # mark delivery areas
            _.each deliveryAreaModels, (deliveryAreaModelToMark) ->
              districtToMark = deliveryAreaModelToMark.get("district") or deliveryAreaModelToMark.get("city")
              deliveryAreaModelToMark.set "isSelected", districtToMark is district

            # update storeviews
            _.each @storeViews, (storeView) ->
              storeView.updateView()

            # TODO rewrite
            @storeViews[0].selectStore()  if @storeViews.length is 1

      @_adjustProportions()
      @$deliveryAreaSelection.delay(200).fadeIn 200

    _adjustProportions: ->
      numberOfRows = parseInt(@$deliveryAreaSelection.height() / 48, 10)
      @$noteContainer.attr("data-delivery-area-rows", numberOfRows)
      @$mapContainer.attr("data-delivery-area-rows", numberOfRows)

    _renderStores: (stores) ->
      latLngBounds = new gmaps.LatLngBounds()
      _.each stores, ((storeModel) ->
        storeView = new StoreView(storeModel, this)
        latLngBounds.extend storeView.position
        @storeViews.push storeView
      ), this
      @_centerMapToBounds latLngBounds

    _noStoresFound: ->
      notificationcenter.notify "views.home.home.noStoresFound",
        postal: @postal

      @_centerMapToNotFoundPostal()
      @_showPromotionView()

    selectStore: (storeModel) ->
      # adjust store alias without notifying
      # (stateModel gets saved through storeModel change)
      stateModel.set
        storeAlias: storeModel.get("alias")
      ,
        silent: true

      # set store model
      stateModel.set "storeModel", storeModel
      router.navigate storeModel.get("alias"), true

    _centerMapToBounds: (latlngbounds) ->
      @map.fitBounds latlngbounds
      @map.setCenter latlngbounds.getCenter()

    _centerMapToNotFoundPostal: ->
      @geocoder.geocode
        address: @postal + ",Germany"
      , (results, status) =>
        if status is gmaps.GeocoderStatus.OK
          @map.setZoom 14
          @map.setCenter results[0].geometry.location

    _getMatchingDeliveryAreas: (stores) ->
      matchingDeliveryAreas = []
      _.each stores, (storeModel) =>
        deliveryAreasCollection = storeModel.get("deliveryAreasCollection")
        filteredDeliveryAreas = deliveryAreasCollection.where(postal: @postal)
        matchingDeliveryAreas = _.union(matchingDeliveryAreas, filteredDeliveryAreas)
      matchingDeliveryAreas

    _showPromotionView: ->
      @promotionView.show()

    _hidePromotionView: ->
      @promotionView.hide()

    destroy: ->
      @postalSearchView.destroy()
      @$mapContainer.remove()
