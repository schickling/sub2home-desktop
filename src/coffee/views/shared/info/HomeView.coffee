define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/shared/info/HomeTemplate.html"
], ($, _, Backbone, HomeTemplate) ->

  HomeView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      @$el.html HomeTemplate

