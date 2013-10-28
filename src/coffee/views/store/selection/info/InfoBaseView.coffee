define [
  "jquery"
  "underscore"
  "backbone"
], ($, _, Backbone) ->

  InfoBaseView = Backbone.View.extend

    className: "info"

    initialize: ->
      @render()

    render: ->
      
      # wrap this.$el
      $el = $("<div>").addClass(@className).appendTo(@$el)
      @$el = $el
      @$el.html @template()
      @renderContent()
      this

    template: ->

    renderContent: ->

