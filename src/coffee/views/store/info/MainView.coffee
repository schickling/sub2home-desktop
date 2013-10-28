define [
  "jquery"
  "underscore"
  "backbone"
  "models/stateModel"
  "views/PageView"
  "views/shared/info/HomeView"
  "views/store/info/StoreView"
  "views/shared/info/NavigationView"
  "text!templates/store/info/MainTemplate.html"
], ($, _, Backbone, stateModel, PageView, HomeView, StoreView, NavigationView, MainTemplate) ->

  MainView = PageView.extend

    template: _.template(MainTemplate)

    initialize: ->
      # set page title
      @model = stateModel.get("storeModel")
      @pageTitle = "Infotheke " + @model.get("title") + " - sub2home"
      @_render()

    _render: ->
      @$el.html MainTemplate
      @_renderStore()
      @_renderHome()
      @_renderNavigation()
      @append()

    _renderStore: ->
      new StoreView(
        el: @$("#storeInfo")
        model: @model
      )

    _renderHome: ->
      new HomeView(el: @$("#homeInfo"))

    _renderNavigation: ->
      new NavigationView(el: @$el)

