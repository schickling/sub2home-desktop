define ["jquery", "jqueryRotate", "underscore", "backbone", "services/notificationcenter", "services/postalOracle", "text!templates/shared/misc/PostalSearchTemplate.html"], ($, jqueryRotate, _, Backbone, notificationcenter, postalOracle, PostalSearchTemplate) ->

  PostalSearchView = Backbone.View.extend

    events:
      "input #locationSelectionInput": "_checkInput"

    $input: null
    $location: null
    $locationLoader: null
    $locationLabel: null
    $deliveryAreaLabel: null
    $storeSelectionLabel: null
    postal: null
    rotateInterval: null

    initialize: ->
      @_render()
      @_cacheDom()

    run: ->
      postal = postalOracle.getPostal()
      if postal
        @_hideRotateLocation()
        @setPostal postal
      else
        @_checkLocation()

    showDeliveryAreaLabel: ->
      @$locationLabel.fadeOut 100
      @$storeSelectionLabel.stop().fadeOut 100
      @$deliveryAreaLabel.stop().delay(100).fadeIn 150

    showStoreSelectionLabel: ->
      @$deliveryAreaLabel.stop().fadeOut 100
      @$locationLabel.fadeOut 100
      @$storeSelectionLabel.stop().delay(100).fadeIn 150

    setPostal: (postal) ->
      postal = parseInt(postal, 10)
      @trigger "newPostal", postal  unless postal is @postal
      postalOracle.setPostal postal  unless postalOracle.getPostal() is postal
      @$input.val postal
      @postal = postal

    destroy: ->
      @_stopLocationDetermination()


    _render: ->
      @$el.html PostalSearchTemplate

    _cacheDom: ->
      @$input = @$("#locationSelectionInput")
      @$deliveryAreaLabel = @$("#deliveryAreaLabel")
      @$storeSelectionLabel = @$("#storeSelectionLabel")
      @$location = @$("#location")
      @$locationLoader = @$("#locationLoader")
      @$locationLabel = @$("#locationLabel")

    _checkLocation: ->
      self = this
      @_startRotateLocation()
      postalOracle.calculate (->
        notificationcenter.notify "views.home.home.lookupLocation"
        self._stopAndFadeOutRotateLocation()
        self._focusSearch()
        self.setPostal postalOracle.getPostal()
      ), ->
        self._stopAndFadeOutRotateLocation()
        self._focusSearch()

    _focusSearch: ->
      @$input.focus()

    _unfocusSearch: ->
      @$input.blur()

    _checkInput: (e) ->
      @_stopLocationDetermination()
      postal = e.target.value.replace(/[^0-9]/, "")
      @$input.val postal
      return  if postal.length < 5
      if @_isValidPostal(postal)
        @setPostal postal
      else
        @$input.val @postal

    _isValidPostal: (postal) ->
      postal > 9999 and postal < 100000

    _hideRotateLocation: ->
      @$locationLoader.hide()
      @$locationLabel.css marginLeft: -174

    _stopLocationDetermination: ->
      @_stopAndFadeOutRotateLocation()
      postalOracle.cancel()

    _startRotateLocation: ->
      $location = @$location
      deg = 0
      @rotateInterval = setInterval(->
        deg = (deg + 5) % 180
        $location.rotate deg
      , 20)

    _stopAndFadeOutRotateLocation: ->
      clearInterval @rotateInterval
      @$locationLoader.stop().fadeOut 100
      @$locationLabel.stop().animate
        marginLeft: -174
      , 200
