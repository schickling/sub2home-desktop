define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/shared/timeline/ItemOverlayTemplate.html"
], ($, _, Backbone, ItemOverlayTemplate) ->

  ItemOverlayBaseView = Backbone.View.extend

    className: "itemTimeline"
    template: _.template(ItemOverlayTemplate)

    initialize: ->
      @render()

    render: ->
      @$el.html @template(@model.toJSON())


