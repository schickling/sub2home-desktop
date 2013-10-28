define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/shared/timeline/ItemStageTemplate.html"
], ($, _, Backbone, ItemStageTemplate) ->

  ItemStageBaseView = Backbone.View.extend

    className: "itemTimeline"
    template: _.template(ItemStageTemplate)

    initialize: ->
      @render()

    render: ->
      @$el.html @template(@model.toJSON())

