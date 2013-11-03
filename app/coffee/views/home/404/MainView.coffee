define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "views/PageView"
  "text!templates/home/404/MainTemplate.html"
], ($, _, Backbone, router, PageView, MainTemplate) ->

  MainView = PageView.extend

    pageTitle: "Seite nicht gefunden - sub2home"

    events:
      "click .bigBack": "_back"

    initialize: ->
      @_render()
      @append()

    _render: ->
      @$el.html MainTemplate

    _back: ->
      router.navigate "/", true

