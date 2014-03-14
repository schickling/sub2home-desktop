define [
  "jquery",
  "underscore",
  "backbone",
  "services/notificationcenter",
  "services/postalOracle",
  "text!templates/shared/misc/PostalSearchTemplate.html"
], ($, _, Backbone, notificationcenter, postalOracle, PostalSearchTemplate) ->

  PostalSearchView = Backbone.View.extend

    events:
      "input #locationSelectionInput": "_checkInput"

    $input: null
    $locationLoader: null
    $locationLabel: null
    $deliveryAreaLabel: null
    $storeSelectionLabel: null
    postal: null

    initialize: ->
      @_render()
      @_cacheDom()

    run: ->
      postal = postalOracle.getPostal()
      if postal
        @_hideSpinner()
        @setPostal postal
      else
        @_checkLocation()

    showDeliveryAreaLabel: ->
      @$el.attr "data-active", "deliveryArea"
      @$locationLabel.removeClass "active"
      @$storeSelectionLabel.removeClass "active"
      @$deliveryAreaLabel.addClass "active"

    showStoreSelectionLabel: ->
      @$el.attr "data-active", "store"
      @$locationLabel.removeClass "active"
      @$storeSelectionLabel.addClass "active"
      @$deliveryAreaLabel.removeClass "active"

    showLocationLabel: ->
      @$el.attr "data-active", "location"
      @$locationLabel.addClass "active"
      @$storeSelectionLabel.removeClass "active"
      @$deliveryAreaLabel.removeClass "active"

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
      @$locationLoader = @$("#locationLoader")
      @$locationLabel = @$("#locationLabel")

    _checkLocation: ->
      postalOracle.calculate (=>
        notificationcenter.notify "views.home.home.lookupLocation"
        @_hideSpinner()
        @_focusSearch()
        @setPostal postalOracle.getPostal()
      ), =>
        @_hideSpinner()
        @_focusSearch()

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

    _hideSpinner: ->
      notificationcenter.destroyAllNotifications()
      @$locationLoader.removeClass "active"

    _stopLocationDetermination: ->
      @_hideSpinner()
      postalOracle.cancel()
