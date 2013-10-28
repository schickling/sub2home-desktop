define [
  "jquery"
  "underscore"
  "backbone"
], ($, _, Backbone) ->

  ItemsBaseView = Backbone.View.extend

    initialize: ->
      @render()

    render: ->
      _.each @collection.models, ((modelItem) ->
        @renderItem modelItem
      ), this

    renderItem: ->


