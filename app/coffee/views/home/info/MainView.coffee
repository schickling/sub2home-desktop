define [
  "jquery"
  "underscore"
  "backbone"
  "collections/StoresCollection"
  "views/PageView"
  "views/shared/info/HomeView"
  "views/home/info/StoreView"
  "views/shared/info/NavigationView"
  "text!templates/home/info/MainTemplate.html"
], ($, _, Backbone, StoresCollection, PageView, HomeView, StoreView, NavigationView, MainTemplate) ->

  MainView = PageView.extend

    pageTitle: "Infotheke - sub2home"

    initialize: ->
      @_render()

    _render: ->
      @$el.html MainTemplate
      @_renderHome()
      @_renderAvailableStores()
      @_renderNavigation()
      @append()

    _renderHome: ->
      new HomeView(el: @$("#homeInfo"))

    _renderAvailableStores: ->
      storesCollection = new StoresCollection()
      $columns = @$("#infoAvailableStores .fluidColumn")
      storesCollection.fetch
        success: ->
          index = 0
          storesCollection.each (storeModel) ->
            unless storeModel.get("alias") is "test"
              storeView = new StoreView
                model: storeModel
              $columns.eq(index % 2).append storeView.$el
              index++

    _renderNavigation: ->
      new NavigationView(el: @$el)

