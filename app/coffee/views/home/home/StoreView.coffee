define ["jquery", "underscore", "services/gmaps", "services/notificationcenter", "text!templates/home/home/StoreTemplate.html"], ($, _, gmaps, notificationcenter, StoreTemplate) ->

  StoreView = (model, parentView) ->

    # link to HomeView
    @parentView = parentView
    @model = model

    # needed in StoresView.js
    addressModel = @model.get("addressModel")
    @position = new gmaps.LatLng(addressModel.get("latitude"), addressModel.get("longitude"))

    # set map
    @setValues map: parentView.map

    # render template
    isDelivering = @model.isDelivering()
    json =
      title: @model.get "title"
      isOpen: @model.get "isOpen"
      isDelivering: isDelivering

    unless isDelivering
      nextDeliveryTimeModel = @model.getNextDeliveryTimeModel()
      json.nextDeliveryTime = nextDeliveryTimeModel.getStartTime()
    @$el = $(@template(json))

    # cache note
    @$note = @$el.find(".smallNote")

    # set state
    @state = "initialized"

  StoreView:: = new gmaps.OverlayView()
  StoreView::template = _.template(StoreTemplate)

  # wrapper around parents selectStore method
  StoreView::selectStore = ->
    switch @state
      when "initialized"
        notificationcenter.notify "views.home.home.selectDeliveryArea"
      when "available"
        @parentView.selectStore @model
      when "unavailable"
        notificationcenter.notify "views.home.home.storeNotInRange"

  # Implement onAdd
  StoreView::onAdd = ->
    pane = @getPanes().overlayMouseTarget
    $(pane).append @$el
    @$el.on "click", =>
      @selectStore()

  # Implement draw
  StoreView::draw = ->
    projection = @getProjection()
    position = projection.fromLatLngToDivPixel(@position)
    @$el.css
      left: position.x - @$el.width() / 2
      top: position.y - 77

  # gets called when a delivery area is choosen
  StoreView::updateView = ->
    deliveryAreasCollection = @model.get("deliveryAreasCollection")
    storeAvailable = deliveryAreasCollection.where(isSelected: true).length
    if storeAvailable
      @markAvailable()
    else
      @markUnavailable()

  StoreView::markAvailable = ->
    @state = "available"
    @$el.removeClass "unavailable"

  StoreView::markUnavailable = ->
    @state = "unavailable"
    @$el.addClass "unavailable"

  StoreView::remove = ->
    @setMap null
    @$el.remove()

  StoreView
