define [
  "jquery"
  "underscore"
  "backbone"
  "views/PageView"
  "views/shared/info/HomeView"
  "views/shared/info/NavigationView"
  "text!templates/home/info/MainTemplate.html"
], ($, _, Backbone, PageView, HomeView, NavigationView, MainTemplate) ->

  MainView = PageView.extend

    template: _.template(MainTemplate)

    pageTitle: "Infotheke - sub2home"

    initialize: ->
      @_render()

    _render: ->
      @$el.html MainTemplate
      @_renderHome()
      @_renderNavigation()
      @append()

    _renderHome: ->
      new HomeView(el: @$("#homeInfo"))

    _renderNavigation: ->
      new NavigationView(el: @$el)

