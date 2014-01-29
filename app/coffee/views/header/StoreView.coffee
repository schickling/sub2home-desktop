define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "services/notificationcenter"
  "models/stateModel"
  "views/header/CartView"
  "text!templates/header/StoreTemplate.html"
], ($, _, Backbone, router, notificationcenter, stateModel, CartView, StoreTemplate) ->

  StoreView = Backbone.View.extend

    template: _.template(StoreTemplate)

    events:
      "click #back": "_backToStoreHome"

    # cached dom
    $back: null

    initialize: ->
      @_render()
      @_listenToCurrentRoute()

    _render: ->
      title = @model.get "title"
      json =
        title: title
        isBackButtonHidden: @_currentRouteIsStoreHome()

      @$el.html @template(json)
      @$('#currentInfo').addClass "isTooLarge"  if title.length > 12

      @_cacheDom()
      @_renderCart()

    _cacheDom: ->
      @$back = @$("#back")

    _renderCart: ->
      cartView = new CartView(el: @$("#trayPreview"))

    _listenToCurrentRoute: ->
      @listenTo stateModel, "change:currentRoute", @_checkBackButton

    _currentRouteIsStoreHome: ->
      currentRoute = stateModel.get("currentRoute")
      currentRoute is "store.home"

    _checkBackButton: ->
      if @_currentRouteIsStoreHome()
        @_hideBackButton()
      else
        @_showBackButton()

    _hideBackButton: ->
      @$back.fadeOut 300

    _showBackButton: ->
      @$back.fadeIn 300

    _backToStoreHome: ->
      router.navigate "store", true
