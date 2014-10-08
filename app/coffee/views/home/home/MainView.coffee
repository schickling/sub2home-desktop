define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "views/PageView"
  "views/home/home/StoresView"
  "text!templates/home/home/MainTemplate.html"
], ($, _, Backbone, notificationcenter, PageView, StoresView, MainTemplate) ->

  MainView = PageView.extend

    pageTitle: "sub2home - Deine Onlinetheke für SUBWAY®-Lieferservices"

    subViews:
      storesView: null

    initialize: ->
      @_render()

    _render: ->
      @$el.html MainTemplate
      @subViews.storesView = new StoresView(el: @$el)
      @append()

    destroy: ->
      notificationcenter.destroyAllNotifications()
      @destroyAllSubViews()
