define [
  "jquery"
  "underscore"
  "backbone"
  "services/gmaps"
  "views/assets/mapStyles"
], ($, _, Backbone, gmaps, mapStyles) ->

  MapView = Backbone.View.extend

    map: null
    marker: null

    initialize: ->
      @_loadMap()

    _loadMap: ->
      mapOptions =
        center: new gmaps.LatLng(@model.get("latitude"), @model.get("longitude"))
        
        # Berlin
        zoom: 15
        keyboardShortcuts: false
        disableDefaultUI: true
        draggable: false
        disableDoubleClickZoom: true
        scrollwheel: false
        styles: mapStyles
        mapTypeId: gmaps.MapTypeId.TERRAIN

      map = @map = new gmaps.Map(@el, mapOptions)
      
      # initialize geocoder
      @geocoder = new gmaps.Geocoder()
      
      # wait unitl map is loaded
      self = this
      gmaps.event.addListenerOnce map, "idle", ->
        gmaps.event.trigger map, "resize"
        self._addMarker()
        self._listenForCoordinateChanges()


    _addMarker: ->
      # url
      # size
      # origin
      icon = new gmaps.MarkerImage("https://d3uu6huyzvecb1.cloudfront.net/images/common/pin.png", null, null, new gmaps.Point(29, 87)) # anchor
      marker = @marker = new gmaps.Marker(
        position: @map.getCenter()
        icon: icon
        cursor: "default"
      )
      
      # To add the marker to the map, call setMap();
      marker.setMap @map

    _listenForCoordinateChanges: ->
      @listenTo @model, "change", ->
        newCenter = new gmaps.LatLng(@model.get("latitude"), @model.get("longitude"))
        @marker.setPosition newCenter
        @map.setCenter newCenter


    destroy: ->
      @stopListening()

