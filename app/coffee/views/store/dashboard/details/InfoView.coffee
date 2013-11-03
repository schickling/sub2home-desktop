define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/dashboard/details/InfoTemplate.html"
], ($, _, Backbone, InfoTemplate) ->

  InfoView = Backbone.View.extend

    template: _.template(InfoTemplate)

    initialize: ->
      @_render()

    _render: ->
      json = comment: @model.get("comment")
      @$el.html @template(json)


